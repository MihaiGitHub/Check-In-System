import React, { Fragment, useState, useContext } from "react";
import { getClients } from "./common/apiCore";
import Modal from "./common/Modal";
import { ClientContext } from "./common/ClientContext";
import { clientUpdateStatus } from "./common/ClientHelpers";

const Serving = (props) => {
  const [clients, setClients] = useContext(ClientContext);
  const [client, setClient] = useState({});

  const refreshServing = () => {
    getClients(props.place).then((response) => {
      if (response) {
        if (response.data.error) {
          console.log("Response error: ", response.data.error);
        } else {
          const { checkedIn, serving, checkedOut } = clientUpdateStatus(
            response.data.clients
          );

          setClients((prevClients) => {
            return {
              ...prevClients,
              place: props.place,
              checkedIn,
              serving,
              checkedOut,
            };
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
                {serving.map((client, index) => {
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
                      data-target="#servingModal"
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
        modalId="servingModal"
        client={client}
        type="checkout"
        refreshFunction={refreshServing}
      />
    </Fragment>
  );
};

export default Serving;
