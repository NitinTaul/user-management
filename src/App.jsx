import React, { useEffect, useState } from "react";
import { getUsers, addUser, updateUser, deleteUser } from "./api/usersApi";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";
import Pagination from "./components/Pagination";
import AlertMessage from "./components/AlertMessage";
import TopControls from "./components/TopControls";

function App() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState({});
  const [alert, setAlert] = useState(null);

  // Fetch users once
  useEffect(() => {
    getUsers()
      .then((data) => {
        const withSplitNames = data.map((u) => {
          const parts = u.name.split(" ");
          return {
            ...u,
            firstName: parts[0] || "",
            lastName: parts.slice(1).join(" ") || "",
          };
        });
        setUsers(withSplitNames);
      })
      .catch(() => setAlert({ type: "danger", message: "❌ Failed to load users" }));
  }, []);

  // Auto-hide alert
  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  // CRUD
  const handleAdd = async (user) => {
    try {
      const newUser = await addUser(user);
      setUsers([newUser, ...users]);
      setShowForm(false);
      setAlert({ type: "success", message: "✅ User added successfully" });
    } catch {
      setAlert({ type: "danger", message: "❌ Failed to add user" });
    }
  };

  const handleUpdate = async (id, user) => {
    try {
      const updated = await updateUser(id, user);
      setUsers(users.map((u) => (u.id === id ? updated : u)));
      setShowForm(false);
      setEditingUser(null);
      setAlert({ type: "success", message: "✅ User updated successfully" });
    } catch {
      setAlert({ type: "danger", message: "❌ Failed to update user" });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this user?")) {
      try {
        await deleteUser(id);
        setUsers(users.filter((u) => u.id !== id));
        setAlert({ type: "success", message: "🗑️ User deleted successfully" });
      } catch {
        setAlert({ type: "danger", message: "❌ Failed to delete user" });
      }
    }
  };

  // 🔹 Process data
  let processed = [...users];
  processed = processed.filter((u) =>
    (!filter.firstName || u.firstName.toLowerCase().includes(filter.firstName.toLowerCase())) &&
    (!filter.lastName || u.lastName.toLowerCase().includes(filter.lastName.toLowerCase())) &&
    (!filter.email || u.email.toLowerCase().includes(filter.email.toLowerCase())) &&
    (!filter.department || (u.company?.name || "").toLowerCase().includes(filter.department.toLowerCase()))
  );

  if (search) {
    processed = processed.filter((u) =>
      `${u.firstName} ${u.lastName} ${u.email} ${u.company?.name}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }

  processed.sort((a, b) => {
    let A = a[sortField];
    let B = b[sortField];
    const numA = parseFloat(A);
    const numB = parseFloat(B);
    const isNumeric = !isNaN(numA) && !isNaN(numB);
    if (isNumeric) {
      A = numA;
      B = numB;
    } else {
      A = (A || "").toString().toLowerCase();
      B = (B || "").toString().toLowerCase();
    }
    if (A < B) return sortOrder === "asc" ? -1 : 1;
    if (A > B) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const total = processed.length;
  const totalPages = Math.ceil(total / pageSize);
  const start = (page - 1) * pageSize;
  const pagedUsers = processed.slice(start, start + pageSize);

  return (
    <div className="container my-4">
      <h2>User Management</h2>

      <AlertMessage alert={alert} onClose={() => setAlert(null)} />

      <TopControls
        search={search}
        setSearch={setSearch}
        setPage={setPage}
        setShowFilter={setShowFilter}
        setEditingUser={setEditingUser}
        setShowForm={setShowForm}
      />

      <UserList
        users={pagedUsers}
        onEdit={(u) => { setEditingUser(u); setShowForm(true); }}
        onDelete={handleDelete}
        sortField={sortField}
        sortOrder={sortOrder}
        setSortField={setSortField}
        setSortOrder={setSortOrder}
      />

      <div className="d-flex justify-content-between align-items-center mt-3">
        <Pagination current={page} total={totalPages} onChange={setPage} />
        <select
          className="form-select w-auto"
          value={pageSize}
          onChange={(e) => { setPageSize(Number(e.target.value)); setPage(1); }}
        >
          <option value={5}>5 / page</option>
          <option value={10}>10 / page</option>
          <option value={25}>25 / page</option>
          <option value={50}>50 / page</option>
          <option value={100}>100 / page</option>
        </select>
      </div>

      {showForm && (
        <UserForm
          user={editingUser}
          onCancel={() => setShowForm(false)}
          onSave={(data) => editingUser ? handleUpdate(editingUser.id, data) : handleAdd(data)}
        />
      )}
      {showFilter && (
        <FilterModal
          initial={filter}
          onClose={() => setShowFilter(false)}
          onApply={(f) => { setFilter(f); setPage(1); setShowFilter(false); }}
          onClear={() => { setFilter({}); setPage(1); setShowFilter(false); }}
        />
      )}
    </div>
  );
}

export default App;
