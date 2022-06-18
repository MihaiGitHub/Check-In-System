import React, { useEffect, Fragment, useState, useContext } from "react";
import { ClientContext } from "../common/ClientContext";
import { clientUpdateStatus } from "../common/ClientHelpers";
import { errorMessage } from "../common/Error";
import {
  updateClientStatus,
  saveClientVisit,
  getClients,
  clearCheckout,
  getItems,
} from "./apiCore";

const Modal = ({ modalId, client, type, refreshFunction, place }) => {
  const [error, setError] = useState(false);
  const [errorMsg, setErrMsg] = useState("");
  const [visitSaved, setVisitSaved] = useState(false);
  const [clients, setClients] = useContext(ClientContext);
  // all items at the selected place
  const [items, setItems] = useState([]);

  const [visit, setVisit] = useState({
    place_of_service: "",
    date_of_visit: "",
    item: "",
    notes: "",
    weight: "",
    numOfItems: "",
  });

  const { date_of_visit, item, notes, weight, numOfItems } = visit;

  useEffect(() => {
    if (type === "checkout") {
      getItems(place).then(({ data }) => {
        setItems(data.items);
      });
    }
  }, []);

  const handleChange = (name) => (event) => {
    if (name == "item") {
      const itemType = document.querySelector(
        `option[value="${event.target.value}"]`
      ).dataset.type;

      if (itemType === "Weight") {
        setVisit({
          ...visit,
          item: event.target.value,
          weight: 0,
          numOfItems: "",
        });
      } else {
        setVisit({
          ...visit,
          item: event.target.value,
          weight: "",
          numOfItems: 0,
        });
      }
    } else {
      setVisit({ ...visit, [name]: event.target.value });
    }
  };

  const handleServing = (e) => {
    e.preventDefault();

    updateClientStatus(client.id, type).then((response) => {
      refreshFunction();
    });
  };

  const handleVisitBeforeCheckout = (e) => {
    e.preventDefault();

    const visit = {
      id: client.id,
      c_id: client.c_id,
      place_of_service: client.placeOfService,
      date_of_visit,
      item,
      notes,
      weight,
      numOfItems,
    };

    saveClientVisit(visit).then((response) => {
      setVisitSaved(true);
    });
  };

  const handleClearCheckout = (e) => {
    e.preventDefault();

    clearCheckout(place).then((response) => {
      getClients(place).then((response) => {
        if (response) {
          if (response.data.error) {
            // response can come back as error if there are no other clients in this place
            // (checkedIn, serving) after being cleared from checkout
            setClients((prevClients) => {
              return { ...prevClients, checkedOut: [] };
            });
          } else {
            const { checkedIn, serving, checkedOut } = clientUpdateStatus(
              response.data.clients
            );

            setClients((prevClients) => {
              return {
                ...prevClients,
                place,
                checkedIn,
                serving,
                checkedOut,
              };
            });
          }
        } else {
          setError(true);
          setErrMsg("No response from server");
        }
      });
    });
  };

  const serving = () => (
    <div
      className="modal fade"
      id={modalId}
      tabIndex="-1"
      role="dialog"
      aria-labelledby="clientModalTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            {error && errorMessage(errorMsg)}
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
            <button
              onClick={handleServing}
              className="btn btn-primary"
              data-dismiss="modal"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const checkout = () => (
    <div
      className="modal fade"
      id={modalId}
      tabIndex="-1"
      role="dialog"
      aria-labelledby="clientModalTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="clientModalTitle">
              Add visit for{" "}
              <span style={{ color: "green" }}>
                {client.fname} {client.lname}
              </span>{" "}
              and move to {type}?
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
          <div className="modal-body">
            <div className="form-group col-sm">
              <div
                className="alert alert-success"
                role="alert"
                style={{ display: visitSaved ? "block" : "none" }}
              >
                Client visit has been saved!
              </div>

              <label htmlFor="dateOfVisit">
                <strong>Date of Visit</strong>
              </label>
              <input
                onChange={handleChange("date_of_visit")}
                type="date"
                className="form-control"
                id="dateOfVisit"
              />
            </div>
            <div className="form-group col-sm">
              <label htmlFor="item">
                <strong>Item</strong>
              </label>

              <div className="input-group mb-3">
                {items && (
                  <select
                    onChange={handleChange("item")}
                    className="custom-select"
                    id="item"
                  >
                    {items.map((item, index) => {
                      if (client.specificRequest) {
                        const itemsRequested = JSON.parse(
                          client.specificRequest.replace(/&quot;/g, '"')
                        );

                        if (item.name === itemsRequested[0]) {
                          return (
                            <option
                              selected
                              data-type={item.itemType}
                              value={item.name}
                            >
                              {item.name}
                            </option>
                          );
                        }
                      }

                      return (
                        <option data-type={item.itemType} value={item.name}>
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                )}
              </div>
            </div>
            <div
              className="form-group col-sm"
              style={{ display: weight !== "" ? "block" : "none" }}
            >
              <label htmlFor="weight">
                <strong>Weight</strong>
              </label>
              <input
                type="number"
                className="form-control"
                id="weight"
                onChange={handleChange("weight")}
              />
            </div>
            <div
              className="form-group col-sm"
              style={{ display: numOfItems !== "" ? "block" : "none" }}
            >
              <label htmlFor="numOfItems">
                <strong>Number of items</strong>
              </label>
              <input
                type="number"
                className="form-control"
                id="numOfItems"
                onChange={handleChange("numOfItems")}
              />
            </div>
            <div className="form-group col-sm">
              <label htmlFor="notes">
                <strong>Notes</strong>
              </label>
              <textarea
                onChange={handleChange("notes")}
                className="form-control rounded-0"
                id="notes"
                rows="3"
              ></textarea>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Cancel
            </button>
            <button
              onClick={handleVisitBeforeCheckout}
              className="btn btn-success"
            >
              Save
            </button>
            <button
              onClick={handleServing}
              className="btn btn-primary"
              data-dismiss="modal"
            >
              Move to checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const clearClients = () => (
    <div
      className="modal fade"
      id={modalId}
      tabIndex="-1"
      role="dialog"
      aria-labelledby="clientModalTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="clientModalTitle">
              Clear checked out clients?
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
          <div className="modal-body">The list will be cleared</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Cancel
            </button>
            <button
              onClick={handleClearCheckout}
              className="btn btn-primary"
              data-dismiss="modal"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Fragment>
      {type == "serving" && serving()}
      {type == "checkout" && checkout()}
      {type == "clearcheckout" && clearClients()}
    </Fragment>
  );
};

export default Modal;
