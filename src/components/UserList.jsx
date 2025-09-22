import React from "react";

export default function UserList({
  users = [],
  loading = false,
  onEdit,
  onDelete,
  sortField,
  sortOrder,
  setSortField,
  setSortOrder,
}) {
  // Toggle sort for a column
  function toggleSort(field) {
    if (!setSortField || !setSortOrder) return;
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  }

  // Show arrow next to sorted column
  function showSortArrow(field) {
    if (sortField === field) {
      return sortOrder === "asc" ? " ▲" : " ▼";
    }
    return "";
  }

  return (
    <div className="table-responsive">
      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th style={{ cursor: "pointer" }} onClick={() => toggleSort("id")}>
              ID{showSortArrow("id")}
            </th>
            <th style={{ cursor: "pointer" }} onClick={() => toggleSort("firstName")}>
              First Name{showSortArrow("firstName")}
            </th>
            <th style={{ cursor: "pointer" }} onClick={() => toggleSort("lastName")}>
              Last Name{showSortArrow("lastName")}
            </th>
            <th style={{ cursor: "pointer" }} onClick={() => toggleSort("email")}>
              Email{showSortArrow("email")}
            </th>
            <th style={{ cursor: "pointer" }} onClick={() => toggleSort("department")}>
              Company{showSortArrow("company")}
            </th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {loading && (
            <tr>
              <td colSpan="6" className="text-center py-4">
                Loading...
              </td>
            </tr>
          )}

          {!loading && users.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center py-4">
                No users found
              </td>
            </tr>
          )}

          {!loading &&
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.firstName ?? ""}</td>
                <td>{user.lastName ?? ""}</td>
                <td>{user.email ?? ""}</td>
                <td>{user.company?.name ?? ""}</td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => onEdit && onEdit(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => onDelete && onDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
