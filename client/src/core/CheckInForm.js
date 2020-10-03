import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { saveClient } from "./apiCore";
import Navigation from "./Navigation";
import { errorMessage } from "./Error";

const CheckInForm = () => {
  const [error, setError] = useState(false);
  const [errorMsg, setErrMsg] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [values, setValues] = useState({
    fname: "",
    lname: "",
    address: "",
    city: "",
    state: "AZ",
    zip: "",
    email: "",
  });

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

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    saveClient(values)
      .then(({ data }) => {
        console.log("data ", data);

        if (data.error) {
          setError(true);
          setErrMsg(data.error);
        } else {
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <Navigation logoutFunction={doLogout} logoutLink={true} />
      {error && errorMessage(errorMsg)}
      <form style={{ padding: 15 }}>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="inputFname">First Name</label>
            <input
              type="text"
              className="form-control"
              id="inputFname"
              placeholder="First Name"
              onChange={handleChange("fname")}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputLname">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="inputLname"
              placeholder="Last Name"
              onChange={handleChange("lname")}
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
            onChange={handleChange("address")}
          />
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="inputCity">City</label>
            <input
              type="text"
              className="form-control"
              id="inputCity"
              onChange={handleChange("city")}
            />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="inputState">State</label>
            <select id="inputState" className="form-control">
              <option>Arizona</option>
            </select>
          </div>
          <div className="form-group col-md-2">
            <label htmlFor="inputZip">Zip</label>
            <input
              type="text"
              className="form-control"
              id="inputZip"
              onChange={handleChange("zip")}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="inputEmail">Email</label>
            <input
              type="email"
              className="form-control"
              id="inputEmail"
              onChange={handleChange("email")}
            />
          </div>
        </div>
        <button onClick={handleSubmit} className="btn btn-success">
          Save Client
        </button>
      </form>
    </div>
  );
};

export default CheckInForm;
