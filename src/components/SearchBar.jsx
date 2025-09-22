import React from "react";

function SearchBar({ search, setSearch, setPage }) {
  return (
    <input
      className="form-control"
      placeholder="🔍 Search by name, email or company..."
      value={search}
      onChange={(e) => { setSearch(e.target.value); setPage(1); }}
    />
  );
}

export default SearchBar;
