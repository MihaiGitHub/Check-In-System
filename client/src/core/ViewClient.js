import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const ViewClient = ({ client, values }) => {
  console.log("props ", client, values);

  const buttons = () => (
    <div className="row" style={{ paddingTop: 15 }}>
      <div className="col-sm">
        <Link to="/saveclient" style={{ textDecoration: "none" }}>
          <button type="button" className="btn btn-primary btn-lg btn-block">
            Back
          </button>
        </Link>
      </div>
      <div className="col-sm">
        <Link to="/main" style={{ textDecoration: "none" }}>
          <button type="button" className="btn btn-success btn-lg btn-block">
            Check In
          </button>
        </Link>
      </div>
      <div className="col-sm">
        <Link to="/main" style={{ textDecoration: "none" }}>
          <button type="button" className="btn btn-secondary btn-lg btn-block">
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
                <th scope="col">Number in family</th>
                <th scope="col">Specific request</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{client.fname}</td>
                <td>{client.lname}</td>
                <td>{values.familyNumber}</td>
                <td>{values.specificRequest}</td>
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
