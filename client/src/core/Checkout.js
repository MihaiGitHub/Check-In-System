import React, { Fragment, useState, useContext } from "react";
import { ClientContext } from "./common/ClientContext";
import { getClients } from "./common/apiCore";
import { clientUpdateStatus } from "./common/ClientHelpers";
import Modal from "./common/Modal";
import { errorMessage } from "./common/Error";

const Checkout = (props) => {
  const { place } = props;
  const [clients, setClients] = useContext(ClientContext);
  const [client, setClient] = useState({});
  const [error, setError] = useState(false);
  const [errorMsg, setErrMsg] = useState("");
  const { checkedOut } = clients;

  const refreshCheckout = () => {
    getClients(place).then((response) => {
      console.log(response);
      if (response) {
        if (response.data.error) {
          setError(true);
          setErrMsg(response.data.error);
        } else {
          const { checkedIn, serving, checkedOut } = clientUpdateStatus(
            response.data.clients
          );
          setClients((prevClients) => {
            return { ...prevClients, place, checkedIn, serving, checkedOut };
          });
        }
      } else {
        setError(true);
        setErrMsg("No response from server");
      }
    });
  };

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
                    <tr
                      data-id={client.id}
                      id="modalLaunch"
                      key={index}
                      onClick={() => setClient(client)}
                      data-toggle="modal"
                      data-target="#moveBackToServingModal"
                    >
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
        modalId="moveBackToServingModal"
        client={client}
        type="serving"
        refreshFunction={refreshCheckout}
      />
      <Modal
        modalId="checkoutModal"
        client="Clear checkout"
        type="clearcheckout"
        place={place}
      />
    </Fragment>
  );
};

export default Checkout;
