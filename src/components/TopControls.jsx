import React from "react";
import SearchBar from "./SearchBar";

function TopControls({ search, setSearch, setPage, setShowFilter, setEditingUser, setShowForm }) {
  return (
    <div className="row g-2 align-items-center mb-3">
      {/* Bigger search box */}
      <div className="col-md-6 col-sm-12">
        <SearchBar search={search} setSearch={setSearch} setPage={setPage} />
      </div>

      {/* Filter button */}
      <div className="col-auto">
        <button
          className="btn btn-outline-secondary px-3"
          onClick={() => setShowFilter(true)}
        >
          🛠 Filter
        </button>
      </div>

      {/* Add user button */}
      <div className="col-auto">
        <button
          className="btn btn-primary px-3"
          onClick={() => { setEditingUser(null); setShowForm(true); }}
        >
          ➕ Add User
        </button>
      </div>
    </div>
  );
}

export default TopControls;
