import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

const CheckInForm = () => {
    return (
        <div>
        <form style={{ padding: 15 }}>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label for="inputFname">First Name</label>
            <input type="text" className="form-control" id="inputFname" placeholder="First Name"/>
          </div>
          <div className="form-group col-md-6">
            <label for="inputLname">Last Name</label>
            <input type="password" className="form-control" id="inputLname" placeholder="Last Name"/>
          </div>
        </div>
        <div className="form-group">
          <label for="inputAddress">Address</label>
          <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St"/>
        </div>
        <div className="form-group">
          <label for="inputAddress2">Address 2</label>
          <input type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor"/>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label for="inputCity">City</label>
            <input type="text" className="form-control" id="inputCity"/>
          </div>
          <div className="form-group col-md-4">
            <label for="inputState">State</label>
            <select id="inputState" className="form-control">
              <option>Arizona</option>
            </select>
          </div>
          <div className="form-group col-md-2">
            <label for="inputZip">Zip</label>
            <input type="text" className="form-control" id="inputZip"/>
          </div>
        </div>
        <Link to="/CheckIn" style={{ color: 'white', textDecoration: 'none' }}>
            <button type="submit" className="btn btn-success">Save Client</button>
        </Link>
      </form>
      </div>
    );
}

export default CheckInForm;