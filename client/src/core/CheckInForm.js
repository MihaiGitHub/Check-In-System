import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { saveClient, getClient } from "./common/apiCore";
import Navigation from "./common/Navigation";
import { errorMessage } from "./common/Error";
import ViewClient from "./ViewClient";

const CheckInForm = () => {
  const [error, setError] = useState(false);
  const [errorMsg, setErrMsg] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [client, setClient] = useState({});
  const [values, setValues] = useState({
    email: "",
    status: "checkin",
    familyNumber: 0,
    specificRequest: [],
  });

  const { email, familyNumber, specificRequest } = values;

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
    if (name == "specificRequest") {
      setValues({
        ...values,
        specificRequest: [...specificRequest, event.target.value],
      });
    } else {
      setValues({ ...values, [name]: event.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("values ", values);

    if (email !== "" && familyNumber !== "") {
      // saveClient(values)
      //   .then(({ data }) => {
      //     console.log("data ", data);
      //     if (data.error) {
      //       setError(true);
      //       setErrMsg(data.error);
      //     } else {
      //       setRedirect(true);
      //     }
      //   })
      //   .catch((error) => console.log(error));
      getClient(email).then((response) => {
        if (response) {
          if (response.data.error) {
            setError(true);
            setErrMsg(response.data.error);
          } else {
            console.log("success");
            setClient(response.data.client);
            // const { checkedIn, serving, checkedOut } = clientUpdateStatus(
            //   response.data.clients
            // );

            // setClients((prevClients) => {
            //   return { checkedIn, serving, checkedOut };
            // });
          }
        } else {
          setError(true);
          setErrMsg("No response from server");
        }
      });
    } else {
      setError(true);
      setErrMsg("Email address and family number must not be blank");
    }
  };

  const form = () => (
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
              onChange={handleChange("specificRequest")}
              className="form-check-input"
              type="checkbox"
              value="Cat Food"
              id="catFood"
            />
            <label className="form-check-label" htmlFor="catFood">
              Cat Food
            </label>
          </div>

          <div className="form-check">
            <input
              onChange={handleChange("specificRequest")}
              className="form-check-input"
              type="checkbox"
              value="Dog Food"
              id="dogFood"
            />
            <label className="form-check-label" htmlFor="dogFood">
              Dog Food
            </label>
          </div>

          <div className="form-check">
            <input
              onChange={handleChange("specificRequest")}
              className="form-check-input"
              type="checkbox"
              value="Hygiene"
              id="hygiene"
            />
            <label className="form-check-label" htmlFor="hygiene">
              Hygiene
            </label>
          </div>

          <div className="form-check">
            <input
              onChange={handleChange("specificRequest")}
              className="form-check-input"
              type="checkbox"
              value="Baby Essentials"
              id="babyEssentials"
            />
            <label className="form-check-label" htmlFor="babyEssentials">
              Baby Essentials
            </label>
          </div>

          <div className="form-check">
            <input
              onChange={handleChange("specificRequest")}
              className="form-check-input"
              type="checkbox"
              value="Household Supplies"
              id="householdSupplies"
            />
            <label className="form-check-label" htmlFor="householdSupplies">
              Household Supplies
            </label>
          </div>

          <div className="form-check">
            <input
              onChange={handleChange("specificRequest")}
              className="form-check-input"
              type="checkbox"
              value="Gluten Free"
              id="glutenFree"
            />
            <label className="form-check-label" htmlFor="glutenFree">
              Gluten Free
            </label>
          </div>
        </div>
      </div>
      <button onClick={handleSubmit} className="btn btn-success">
        Search Client
      </button>
    </form>
  );

  return (
    <div>
      <Navigation logoutFunction={doLogout} logoutLink={true} />
      {error && errorMessage(errorMsg)}
      {Object.entries(client).length === 0 && form()}
      {Object.entries(client).length !== 0 && (
        <ViewClient client={client} values={values} />
      )}
    </div>
  );
};

export default CheckInForm;
