import React, { Fragment, useState, useContext } from "react";
import { getClients } from "./common/apiCore";
import Modal from "./common/Modal";
import { ClientContext } from "./common/ClientContext";

const Serving = () => {
  const [clients, setClients] = useContext(ClientContext);
  const [client, setClient] = useState({});

  const refreshServing = () => {
    getClients().then((response) => {
      if (response) {
        if (response.data.error) {
          console.log("Response error: ", response.data.error);
        } else {
          const checkedIn = response.data.clients.filter((client) => {
            return client.status === "checkin";
          });

          const serving = response.data.clients.filter((client) => {
            return client.status === "serving";
          });

          const checkedOut = response.data.clients.filter((client) => {
            return client.status === "checkout";
          });

          setClients((prevClients) => {
            return { checkedIn, serving, checkedOut };
          });
        }
      } else {
        console.log("No response error");
      }
    });
  };

  const { serving } = clients;

  return (
    <Fragment>
      {serving.length == 0 && (
        <div className="row">
          <div className="col-sm-6 offset-sm-3">
            <div
              className="alert alert-success"
              role="alert"
              style={{ textAlign: "center" }}
            >
              <strong>No clients being served</strong>
            </div>
          </div>
        </div>
      )}
      {serving.length > 0 && (
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
                {serving.map((client, index) => (
                  <tr
                    data-id={client.id}
                    id="modalLaunch"
                    key={index}
                    onClick={() => setClient(client)}
                    data-toggle="modal"
                    data-target="#servingModal"
                  >
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
      <Modal
        modalId="servingModal"
        client={client}
        type="checkout"
        refreshFunction={refreshServing}
      />
    </Fragment>
  );
};

export default Serving;
