import React, { useState, useEffect } from "react";

export default function FilterModel({ initial = {}, onClose, onApply, onClear }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setcompany] = useState("");

  useEffect(() => {
    setFirstName(initial.firstName || "");
    setLastName(initial.lastName || "");
    setEmail(initial.email || "");
    setcompany(initial.company || "");
  }, [initial]);

  const apply = () => {
    onApply({ firstName, lastName, email, company });
  };

  const clear = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setcompany("");
    onClear();
  };

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Filter Users</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">First Name</label>
              <input
                className="form-control"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Last Name</label>
              <input
                className="form-control"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Company</label>
              <input
                className="form-control"
                value={company}
                onChange={(e) => setcompany(e.target.value)}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={clear}>Clear</button>
            <button className="btn btn-primary" onClick={apply}>Apply</button>
          </div>
        </div>
      </div>
    </div>
  );
}
