import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { saveClient } from "./common/apiCore";
import { errorMessage } from "./common/Error";

const ViewClient = ({ client, values }) => {
  const [error, setError] = useState(false);
  const [errorMsg, setErrMsg] = useState("");
  const [redirect, setRedirect] = useState(false);

  if (redirect) {
    return <Redirect to="/" />;
  }

  const handleCheckIn = (e) => {
    e.preventDefault();

    const data = {
      fname: client.fname,
      lname: client.lname,
      status: values.status,
      familyNumber: values.familyNumber,
      specificRequest: values.specificRequest.toString(),
      email: values.email,
    };

    saveClient(data).then((response) => {
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

  const buttons = () => (
    <div className="row" style={{ paddingTop: 15 }}>
      <div className="col-sm">
        <button
          onClick={handleCheckIn}
          className="btn btn-success btn-lg btn-block"
        >
          Check In
        </button>
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
                <th scope="col">Number in family</th>
                <th scope="col">Specific request</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{client.fname}</td>
                <td>{client.lname}</td>
                <td>{client.address}</td>
                <td>{client.email}</td>
                <td>{client.phone}</td>
                <td>{values.familyNumber}</td>
                <td>
                  {values.specificRequest.map((request) => request + " | ")}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {buttons()}
    </Fragment>
  );
};

export default ViewClient;
