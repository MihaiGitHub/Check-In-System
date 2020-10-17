import React, { Fragment, useState, useEffect } from "react";
import { Redirect, withRouter } from "react-router-dom";
import Navigation from "./common/Navigation";
import { updateClientInfo } from "./common/apiCore";
import { errorMessage } from "./common/Error";

const UpdateClient = ({ location }) => {
  const [error, setError] = useState(false);
  const [errorMsg, setErrMsg] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [values, setValues] = useState({
    id: 0,
    fname: "",
    lname: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (location.state) {
      const { client } = location.state;

      setValues({
        id: client.id,
        fname: client.fname,
        lname: client.lname,
        address: client.address,
        city: client.city,
        state: "AZ",
        postalCode: client.postalCode,
        email: client.email,
        phone: client.phone,
      });
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

  if (!location.state) {
    return <Redirect to="/" />;
  }

  const { fname, lname, address, city, postalCode, email, phone } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    updateClientInfo(values).then((response) => {
      if (response) {
        if (response.data.error) {
          setError(true);
          setErrMsg(response.data.error);
        } else {
          setRedirect(true);
        }
      } else {
        setError(true);
        setErrMsg("No response from server");
      }
    });
  };

  const form = () => (
    <Fragment>
      <div className="form-row" style={{ padding: 15 }}>
        <div className="form-group col-md-6">
          <label htmlFor="inputFname">
            <strong>First Name</strong>
          </label>
          <input
            type="text"
            className="form-control"
            id="inputFname"
            placeholder="First Name"
            onChange={handleChange("fname")}
            value={fname}
          />
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="inputLname">
            <strong>Last Name</strong>
          </label>
          <input
            type="text"
            className="form-control"
            id="inputLname"
            placeholder="Last Name"
            onChange={handleChange("lname")}
            value={lname}
          />
        </div>
      </div>
      <div className="form-group" style={{ padding: 15 }}>
        <label htmlFor="inputAddress">
          <strong>Address</strong>
        </label>
        <input
          type="text"
          className="form-control"
          id="inputAddress"
          placeholder="1234 Main St"
          onChange={handleChange("address")}
          value={address}
        />
      </div>
      <div className="form-row" style={{ padding: 15 }}>
        <div className="form-group col-md-6">
          <label htmlFor="inputCity">
            <strong>City</strong>
          </label>
          <input
            type="text"
            className="form-control"
            id="inputCity"
            onChange={handleChange("city")}
            placeholder="Tucson"
            value={city}
          />
        </div>
        <div className="form-group col-md-4">
          <label htmlFor="inputState">
            <strong>State</strong>
          </label>
          <select id="inputState" className="form-control">
            <option>Arizona</option>
          </select>
        </div>
        <div className="form-group col-md-2">
          <label htmlFor="inputZip">
            <strong>Zip</strong>
          </label>
          <input
            type="text"
            className="form-control"
            id="inputZip"
            onChange={handleChange("postalCode")}
            value={postalCode}
          />
        </div>
      </div>
      <div className="form-row" style={{ padding: 15 }}>
        <div className="form-group col-md-6">
          <label htmlFor="inputEmail">
            <strong>Email</strong>
          </label>
          <input
            type="email"
            className="form-control"
            id="inputEmail"
            placeholder="Email"
            onChange={handleChange("email")}
            value={email}
          />
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="inputPhone">
            <strong>Phone</strong>
          </label>
          <input
            type="text"
            className="form-control"
            id="inputPhone"
            placeholder="Phone"
            onChange={handleChange("phone")}
            value={phone}
          />
        </div>
      </div>
      <div className="form-row" style={{ padding: 15 }}>
        <div className="form-group col-md-12">
          <button
            onClick={handleSubmit}
            className="btn btn-success btn-lg btn-block"
          >
            Submit
          </button>
        </div>
      </div>
    </Fragment>
  );

  return (
    <Fragment>
      <Navigation logoutFunction={doLogout} logoutLink={true} />
      {error && errorMessage(errorMsg)}

      {form()}
    </Fragment>
  );
};

export default withRouter(UpdateClient);
