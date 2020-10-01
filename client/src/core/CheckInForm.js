import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";

const CheckInForm = () => {
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("jwt")) {
    } else {
      setRedirect(true);
    }
  }, []);

  const doLogout = () => {
    sessionStorage.setItem("jwt", "");
    sessionStorage.clear();
    setRedirect(true);
  };

  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <Link to="/main" style={{ color: "white", textDecoration: "none" }}>
          Tucson Neighborhood Food Pantry
        </Link>
        <Link
          onClick={doLogout}
          to="#"
          style={{ color: "white", textDecoration: "none" }}
        >
          Log out
        </Link>
      </nav>
      <form style={{ padding: 15 }}>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="inputFname">First Name</label>
            <input
              type="text"
              className="form-control"
              id="inputFname"
              placeholder="First Name"
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputLname">Last Name</label>
            <input
              type="password"
              className="form-control"
              id="inputLname"
              placeholder="Last Name"
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="inputAddress">Address</label>
          <input
            type="text"
            className="form-control"
            id="inputAddress"
            placeholder="1234 Main St"
          />
        </div>
        <div className="form-group">
          <label htmlFor="inputAddress2">Address 2</label>
          <input
            type="text"
            className="form-control"
            id="inputAddress2"
            placeholder="Apartment, studio, or floor"
          />
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="inputCity">City</label>
            <input type="text" className="form-control" id="inputCity" />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="inputState">State</label>
            <select id="inputState" className="form-control">
              <option>Arizona</option>
            </select>
          </div>
          <div className="form-group col-md-2">
            <label htmlFor="inputZip">Zip</label>
            <input type="text" className="form-control" id="inputZip" />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="inputEmail">Email</label>
            <input type="text" className="form-control" id="inputEmail" />
          </div>
        </div>
        <Link to="/CheckIn" style={{ color: "white", textDecoration: "none" }}>
          <button type="submit" className="btn btn-success">
            Save Client
          </button>
        </Link>
      </form>
    </div>
  );
};

export default CheckInForm;
