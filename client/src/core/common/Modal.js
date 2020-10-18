import React, { Fragment, useState } from "react";
import { updateClientStatus, saveClientVisit } from "./apiCore";

const Modal = ({ modalId, client, type, refreshFunction }) => {
  const [visit, setVisit] = useState({
    place_of_service: '',
    date_of_visit: '',
    item: '',
    notes: '',
    weight: '',
    numOfItems: ''
  });

  const { place_of_service, date_of_visit, item, notes, weight, numOfItems } = visit;

  const handleChange = name => event => {
    if(name == 'item'){
      switch (event.target.value){
        case 'Food':
          setVisit({ ...visit, item: event.target.value, weight: 0, numOfItems: '' });
          break;
        case 'Hygiene items':
          setVisit({ ...visit, item: event.target.value, numOfItems: 0, weight: '' });
          break;
        case 'Baby essentials':
          setVisit({ ...visit, item: event.target.value, numOfItems: 0, weight: '' });
          break;
        case 'Pet food':
          setVisit({ ...visit, item: event.target.value, numOfItems: 0, weight: '' });
          break;
        case 'Thanksgiving food box':
          setVisit({ ...visit, item: event.target.value, weight: 0, numOfItems: '' });
          break;
        case 'Christmas food box':
          setVisit({ ...visit, item: event.target.value, numOfItems: 0, weight: '' });
          break;
      }
    }
    else {
      setVisit({ ...visit, [name]: event.target.value });
    }
  }

  const handleServing = (e) => {
    e.preventDefault();

    updateClientStatus(client.id, type).then((response) => {
      refreshFunction();
    });
  };

  const handleCheckout = e => {
    e.preventDefault();

    const visit = {
      id: client.id,
      c_id: client.c_id,
      place_of_service,
      date_of_visit,
      item,
      notes,
      weight,
      numOfItems
    }

    saveClientVisit(visit).then(response => {
      refreshFunction();
    });
  }

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
              <label htmlFor="placeOfService">
                <strong>Place of service</strong>
              </label>

              <div className="input-group mb-3">
                <select
                  onChange={handleChange('place_of_service')}
                  className="custom-select"
                  id="placeOfService"
                >
                  <option defaultValue value="0">
                    Choose...
                  </option>
                  <option value="Food pantry">Food pantry</option>
                  <option value="Storehouse">Storehouse</option>
                  <option value="Mobile resource center">Mobile resource center</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div className="form-group col-sm">
              <label htmlFor="dateOfVisit">
                <strong>Date of Visit</strong>
              </label>
              <input
                onChange={handleChange('date_of_visit')}
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
                <select
                  onChange={handleChange('item')}
                  className="custom-select"
                  id="item"
                >
                  <option defaultValue value="0">
                    Choose...
                  </option>
                  <option value="Food">Food (weight)</option>
                  <option value="Hygiene items">Hygiene items (# of items)</option>
                  <option value="Baby essentials">Baby essentials (# of items)</option>
                  <option value="Pet food">Pet food (# of items)</option>
                  <option value="Thanksgiving food box">Thanksgiving food box (weight)</option>
                  <option value="Christmas food box">Christmas food box (# of items)</option>
                </select>
              </div>
            </div>
          <div className="form-group col-sm" style={{ display: weight !== '' ? 'block' : 'none' }}>
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
          <div className="form-group col-sm" style={{ display: numOfItems !== '' ? 'block' : 'none' }}>
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
                <label htmlFor="notes"><strong>Notes</strong></label>
                <textarea                
                  onChange={handleChange('notes')}
                  className="form-control rounded-0" id="notes" rows="3"></textarea>
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
              onClick={handleCheckout}
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
      {type == 'serving' && serving()}      
      {type == 'checkout' && checkout()}
    </Fragment>
  );
};

export default Modal;
