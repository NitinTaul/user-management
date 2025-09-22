import React from "react";

export default function Pagination({ current, total, onChange }) {
  const go = (n) => {
    if (n >= 1 && n <= total) {
      onChange(n);
    }
  };

  return (
    <div className="d-flex align-items-center">
      <button
        className={`btn me-2 ${
          current > 1 ? "btn-secondary" : "btn-outline-secondary"
        }`}
        onClick={() => go(current - 1)}
        disabled={current <= 1}
      >
        Previous
      </button>

      <span className="mx-2">
        Page {current} of {total}
      </span>

      <button
        className={`btn ms-2 ${
          current < total ? "btn-secondary" : "btn-outline-secondary"
        }`}
        onClick={() => go(current + 1)}
        disabled={current >= total}
      >
        Next
      </button>
    </div>
  );
}
