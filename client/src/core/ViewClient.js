import React, { Fragment, useState } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";

const ViewClient = ({ client }) => {
  console.log("Client1111 ", client);
  const [redirect, setRedirect] = useState(false);

  if (redirect) {
    return <Redirect to="/" />;
  }

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
