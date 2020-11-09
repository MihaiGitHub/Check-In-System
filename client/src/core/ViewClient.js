import React, { Fragment, useState } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import Navigation from "./common/Navigation";
import { errorMessage } from "./common/Error";

const ViewClient = (props) => {
  const [error, setError] = useState(false);
  const [errorMsg, setErrMsg] = useState("");
  const [redirect, setRedirect] = useState(false);

  // redirect if client is not defined
  if (redirect || typeof props.location.state === "undefined") {
    return <Redirect to="/" />;
  }

  const { client } = props.location.state;

  const doLogout = () => {
    sessionStorage.setItem("jwt", "");
    sessionStorage.clear();
    setRedirect(true);
  };

  const buttons = () => (
    <div className="row" style={{ paddingTop: 15 }}>
      <div className="col-sm">
        <Link
          to={{
            pathname: "/placeofservice",
            state: {
              client,
            },
          }}
          style={{ textDecoration: "none" }}
        >
          <button type="button" className="btn btn-success btn-lg btn-block">
            Check In
          </button>
        </Link>
      </div>
      <div className="col-sm">
        <Link
          to={{
            pathname: "/updateclient",
            state: {
              client,
            },
          }}
          style={{ textDecoration: "none" }}
        >
          <button type="button" className="btn btn-primary btn-lg btn-block">
            Update Info
          </button>
        </Link>
      </div>
    </div>
  );

  return (
    <Fragment>
      <Navigation logoutFunction={doLogout} logoutLink={true} />
      {error && errorMessage(errorMsg)}

      <div className="row">
        <div className="col-sm">
          <table className="table table-bordered table-striped mb-0">
            <thead>
              <tr>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Address</th>
                <th scope="col">Email</th>
                <th scope="col">Phone</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{client.fname}</td>
                <td>{client.lname}</td>
                <td>{client.address}</td>
                <td>{client.email}</td>
                <td>{client.phone}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {buttons()}
    </Fragment>
  );
};

export default withRouter(ViewClient);
