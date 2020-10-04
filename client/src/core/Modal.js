import React from "react";
import { updateClient } from "./apiCore";

const Modal = ({ client, type }) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    updateClient(client.id, type).then((response) => {
      console.log("response ", response);
    });

    console.log("type", type);
    console.log("client ", client);
  };

  return (
    <div
      className="modal fade"
      id="clientModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="clientModalTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="clientModalTitle">
              Move{" "}
              <span style={{ color: "green" }}>
                {client.fname} {client.lname}
              </span>{" "}
              to {type}?
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">They will be moved to the {type} tab</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Cancel
            </button>
            <button onClick={handleSubmit} className="btn btn-primary">
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
