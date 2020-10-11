import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { saveClient } from "./common/apiCore";
import Navigation from "./common/Navigation";
import { errorMessage } from "./common/Error";

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
    status: "checkin",
    familyNumber: 0,
    specificRequest: "",
  });

  const { email } = values;

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

    if (email !== "") {
      saveClient(values)
        .then(({ data }) => {
          console.log("data ", data);

          if (data.error) {
            setError(true);
            setErrMsg(data.error);
          } else {
            setRedirect(true);
          }
        })
        .catch((error) => console.log(error));
    } else {
      setError(true);
      setErrMsg("Email address must not be blank");
    }
  };

  return (
    <div>
      <Navigation logoutFunction={doLogout} logoutLink={true} />
      {error && errorMessage(errorMsg)}
      <form style={{ padding: 15 }}>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="inputEmail">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              className="form-control"
              id="inputEmail"
              onChange={handleChange("email")}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputFamilyNumber">
              <strong>How many in your family?</strong>
            </label>

            <div className="input-group mb-3">
              <select
                onChange={handleChange("familyNumber")}
                className="custom-select"
                id="inputFamilyNumber"
              >
                <option defaultValue>Choose...</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
                <option value="4">Four</option>
                <option value="5">Five</option>
                <option value="6">Six</option>
                <option value="7">Seven</option>
                <option value="8">Eight</option>
                <option value="9">Nine</option>
                <option value="10">Ten</option>
              </select>
            </div>
          </div>
          <div className="form-group col-sm">
            <label htmlFor="specificRequest">
              <strong>Specific request</strong>
            </label>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="catFood"
              />
              <label className="form-check-label" htmlFor="catFood">
                Cat Food
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="dogFood"
              />
              <label className="form-check-label" htmlFor="dogFood">
                Dog Food
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="hygiene"
              />
              <label className="form-check-label" htmlFor="hygiene">
                Hygiene
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="babyEssentials"
              />
              <label className="form-check-label" htmlFor="babyEssentials">
                Baby Essentials
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="householdSupplies"
              />
              <label className="form-check-label" htmlFor="householdSupplies">
                Household Supplies
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="glutenFree"
              />
              <label className="form-check-label" htmlFor="glutenFree">
                Gluten Free
              </label>
            </div>
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
