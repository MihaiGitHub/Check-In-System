import React, { Fragment, useState, useEffect } from "react";
import { Redirect, withRouter, Link } from "react-router-dom";
import { getClient } from "./common/apiCore";
import Navigation from "./common/Navigation";
import ViewClient from "./ViewClient";
import { errorMessage } from "./common/Error";

const SearchClient = (props) => {
  const { myClient } = props.location;

  const [error, setError] = useState(false);
  const [errorMsg, setErrMsg] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [client, setClient] = useState({});
  const [values, setValues] = useState({
    email: "",
    status: "checkin",
    familyNumber: "0",
    specificRequest: [],
  });

  const { email, specificRequest } = values;

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

    if (email !== "") {
      getClient(email).then((response) => {
        if (response) {
          if (response.data.error) {
            setError(true);
            setErrMsg(response.data.error);
          } else {
            setError(false);
            setClient(response.data.client);
          }
        } else {
          setError(true);
          setErrMsg("No response from server");
        }
      });
    } else {
      setError(true);
      setErrMsg("Email address must not be blank");
    }
  };

  const form = () => (
    <form style={{ padding: 15 }}>
      <div className="form-row">
        <div className="form-group mx-auto" style={{ width: 400 }}>
          <label htmlFor="inputEmail">
            <strong>Email or Unique ID</strong>
          </label>
          <input
            type="email"
            className="form-control"
            id="inputEmail"
            onChange={handleChange("email")}
          />
          <br />
          <div className="form-row">
            <div className="col-sm-6">
              <Link
                style={{ textDecoration: "none" }}
                to={{
                  pathname: "/registerclient",
                }}
              >
                <button className="btn btn-info btn-lg btn-block">
                  Register Client
                </button>
              </Link>
            </div>
            <div className="col-sm-6">
              <button
                onClick={handleSubmit}
                className="btn btn-success btn-lg btn-block"
              >
                Search Client
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );

  return (
    <Fragment>
      <Navigation logoutFunction={doLogout} logoutLink={true} />
      {error && errorMessage(errorMsg)}
      {form()}
      {Object.entries(client).length > 0 && <ViewClient client={client} />}
      {myClient && <ViewClient client={myClient} />}
    </Fragment>
  );
};

export default withRouter(SearchClient);
