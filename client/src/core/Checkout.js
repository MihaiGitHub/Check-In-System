import React, { Fragment, useContext } from "react";
import { ClientContext } from "./common/ClientContext";

const Checkout = () => {
  const [clients, setClients] = useContext(ClientContext);

  const { checkedOut } = clients;

  return (
    <Fragment>
      {checkedOut.length == 0 && (
        <div className="row">
          <div className="col-sm-6 offset-sm-3">
            <div
              className="alert alert-success"
              role="alert"
              style={{ textAlign: "center" }}
            >
              <strong>No clients in checkout</strong>
            </div>
          </div>
        </div>
      )}
      {checkedOut.length > 0 && (
        <div className="row">
          <div className="col-sm">
            <table className="table table-bordered table-striped mb-0">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">First</th>
                  <th scope="col">Last</th>
                  <th scope="col">Number in family</th>
                  <th scope="col">Specific request</th>
                </tr>
              </thead>
              <tbody>
                {checkedOut.map((client, index) => (
                  <tr data-id={client.id} key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{client.fname}</td>
                    <td>{client.lname}</td>
                    <td>{client.familyNumber}</td>
                    <td>{client.specificRequest}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Checkout;
