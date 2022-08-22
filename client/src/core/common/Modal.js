import React, { useEffect, Fragment, useState, useContext } from "react";
import { ClientContext } from "../common/ClientContext";
import { clientUpdateStatus } from "../common/ClientHelpers";
import { errorMessage } from "../common/Error";
import {
  updateClientStatus,
  saveClientVisitItem,
  getClients,
  clearCheckout,
  getItems,
  updateCheckinItems,
} from "./apiCore";

const Modal = ({ modalId, client, type, refreshFunction, place }) => {
  const [error, setError] = useState(false);
  const [errorMsg, setErrMsg] = useState("");
  const [visitSaved, setVisitSaved] = useState(false);
  const [clients, setClients] = useContext(ClientContext);
  const [weightValue, setWeightValue] = useState("");
  const [numItemsValue, setNumItemsValue] = useState("");

  const [methodsOfPickup, setMethodsOfPickup] = useState([
    "Drive-Thru",
    "Walk-Up",
  ]);

  const [selectedMethodOfPickup, setSelectedMethodOfPickup] = useState("");

  // all items at the selected place
  const [itemsCheckin, setItemsCheckin] = useState([]);
  const [clientItems, setClientItems] = useState([]);

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
    if (type === "editCheckin") {
      setSelectedMethodOfPickup(client.methodOfPickup);
      getItems(client.placeOfService).then(({ data }) => {
        setItemsCheckin(data.items);
      });
      let selectedItems = [];
      if (client.items) {
        client.items.map((i) => selectedItems.push(i.item));
      }
      setClientItems(selectedItems);
    }

    if (type === "checkout") {
      getItems(place).then(({ data }) => {
        setItems(data.items);

        if (client.items !== undefined && client.items.length > 0) {
          let selectedItem = data.items.find(
            (e) => e.name === client.items[0].item
          );

          if (selectedItem !== undefined) {
            if (selectedItem.itemType === "Weight") {
              setVisit({
                ...visit,
                item: selectedItem.name,
                weight: 0,
                numOfItems: "",
              });
            } else {
              setVisit({
                ...visit,
                item: selectedItem.name,
                weight: "",
                numOfItems: 0,
              });
            }
          }
        }
      });
    }
  }, [client]);

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
      if (name === "weight") {
        setWeightValue(event.target.value);
      }

      if (name === "numOfItems") {
        setNumItemsValue(event.target.value);
      }

      setVisit({ ...visit, [name]: event.target.value });
    }
  };

  const handleServing = (e) => {
    e.preventDefault();

    updateClientStatus(client.id, type, visit).then((response) => {
      refreshFunction();
    });
  };

  const handleVisitBeforeCheckout = (e) => {
    e.preventDefault();

    if (weight === 0) {
      if (weightValue === "") {
        alert("Weight value can not be empty");
        return false;
      }
    }

    if (numOfItems === 0) {
      if (numItemsValue === "") {
        alert("Number of items can not be empty");
        return false;
      }
    }

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

    saveClientVisitItem(visit).then((response) => {
      setVisitSaved(true);

      setTimeout(() => {
        setVisitSaved(false);
        setWeightValue("");
        setNumItemsValue("");
        setVisit({ ...visit, notes: "" });
      }, 2000);
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

  const handleItems = (name) => (event) => {
    if (event.target.checked) {
      setClientItems([...clientItems, event.target.value]);
    } else {
      let clientItemsFilter = clientItems.filter(
        (item) => item !== event.target.value
      );
      setClientItems(clientItemsFilter);
    }
  };

  const handleEditCheckin = () => {
    if (clientItems.length === 0 || selectedMethodOfPickup === "") {
      alert("Please fill in all the information");
      return false;
    }

    updateCheckinItems(
      client.c_id,
      client.placeOfService,
      selectedMethodOfPickup,
      clientItems
    ).then((result) => {
      console.log("result ", result);
    });
  };

  const editCheckin = () => (
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
              Edit
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
              <label>
                <strong>Method of pickup</strong>
              </label>
              <select
                onChange={(e) => setSelectedMethodOfPickup(e.target.value)}
                className="custom-select"
                id="methodsOfPickup"
              >
                <option defaultValue value="0">
                  Choose...
                </option>
                {client &&
                  methodsOfPickup.map((method, index) => {
                    if (method === selectedMethodOfPickup) {
                      return (
                        <option key={index} selected value={method}>
                          {method}
                        </option>
                      );
                    }
                    return (
                      <option key={index} value={method}>
                        {method}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="form-group col-sm">
              <label>
                <strong>Items</strong>
              </label>

              {itemsCheckin &&
                itemsCheckin.map((item, index) => {
                  let selectedItem = clientItems.find((i) => i === item.name);
                  if (selectedItem) {
                    return (
                      <div className="form-check" key={index}>
                        <input
                          onChange={handleItems(index)}
                          className="form-check-input"
                          type="checkbox"
                          value={item.name}
                          id={index}
                          checked
                        />
                        <label className="form-check-label" htmlFor={index}>
                          {item.name}
                        </label>
                      </div>
                    );
                  }
                  return (
                    <div className="form-check" key={index}>
                      <input
                        onChange={handleItems(index)}
                        className="form-check-input"
                        type="checkbox"
                        value={item.name}
                        id={index}
                      />
                      <label className="form-check-label" htmlFor={index}>
                        {item.name}
                      </label>
                    </div>
                  );
                })}
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
              onClick={handleEditCheckin}
              className="btn btn-primary"
              data-dismiss="modal"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );

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
                    {items.map((i, index) => {
                      if (item !== "") {
                        if (i.name === item) {
                          return (
                            <option
                              key={index}
                              selected
                              data-type={i.itemType}
                              value={i.name}
                            >
                              {i.name}
                            </option>
                          );
                        }
                      }

                      return (
                        <option
                          key={index}
                          data-type={i.itemType}
                          value={i.name}
                        >
                          {i.name}
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
                value={weightValue}
                required
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
                value={numItemsValue}
                required
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
                value={notes}
              >
                {notes}
              </textarea>
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
      {type == "editCheckin" && editCheckin()}
      {type == "serving" && serving()}
      {type == "checkout" && checkout()}
      {type == "clearcheckout" && clearClients()}
    </Fragment>
  );
};

export default Modal;
