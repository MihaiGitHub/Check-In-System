import React, { Fragment, useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { doLogin } from "./apiCore";
import Navigation from "./Navigation";

const Login = () => {
  const [error, setError] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const { username, password } = values;

  const handleSubmit = (e) => {
    e.preventDefault();

    doLogin(values).then(({ data }) => {
      if (data.jwt) {
        sessionStorage.setItem("jwt", data.jwt);
        setRedirect(true);
      } else {
        setError(true);
      }
    });
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const showError = () => (
    <div className="alert alert-danger" role="alert">
      <b>Error!</b> Invalid username or password.
    </div>
  );

  const showLogin = () => (
    <div className="cotainer" style={{ marginTop: 15 }}>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">Client Check In System</div>
            <div className="card-body">
              {error && showError()}
              <form action="" method="">
                <div className="form-group row">
                  <label
                    htmlFor="username"
                    className="col-md-4 col-form-label text-md-right"
                  >
                    Username
                  </label>
                  <div className="col-md-6">
                    <input
                      onChange={handleChange("username")}
                      type="text"
                      id="username"
                      className="form-control"
                      name="username"
                      required
                      autoFocus
                      value={username}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label
                    htmlFor="password"
                    className="col-md-4 col-form-label text-md-right"
                  >
                    Password
                  </label>
                  <div className="col-md-6">
                    <input
                      onChange={handleChange("password")}
                      type="password"
                      id="password"
                      className="form-control"
                      name="password"
                      required
                      value={password}
                    />
                  </div>
                </div>

                <div className="col-md-6 offset-md-4">
                  <button onClick={handleSubmit} className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (redirect) {
    return <Redirect to="/main" />;
  }

  if (sessionStorage.getItem("jwt")) {
    return <Redirect to="/main" />;
  }

  return (
    <Fragment>
      <Navigation logoutLink={false} />
      <main role="main" className="container" style={{ maxWidth: "100%" }}>
        {showLogin()}
      </main>
    </Fragment>
  );
};

export default Login;
