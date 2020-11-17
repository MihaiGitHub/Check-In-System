import React, { Fragment, useState, useContext } from "react";
import { ClientContext } from "./common/ClientContext";
import Modal from "./common/Modal";
import { errorMessage } from "./common/Error";

const Checkout = (props) => {
  const [clients, setClients] = useContext(ClientContext);
  const [error, setError] = useState(false);
  const [errorMsg, setErrMsg] = useState("");
  const { checkedOut } = clients;

  return (
    <Fragment>
      {error && errorMessage(errorMsg)}
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
            <button
              style={{ float: "right", marginBottom: 5 }}
              type="button"
              className="btn btn-secondary btn-sm"
              data-toggle="modal"
              data-target="#checkoutModal"
            >
              Clear Checkout
            </button>
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
                {checkedOut.map((client, index) => {
                  const items = JSON.parse(
                    client.specificRequest.replace(/&quot;/g, '"')
                  );

                  return (
                    <tr data-id={client.id} id="modalLaunch" key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{client.fname}</td>
                      <td>{client.lname}</td>
                      <td>{client.familyNumber}</td>
                      <td>
                        <ul>
                          {items.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <Modal
        modalId="checkoutModal"
        client="Clear checkout"
        type="clearcheckout"
        place={props.place}
      />
    </Fragment>
  );
};

export default Checkout;
