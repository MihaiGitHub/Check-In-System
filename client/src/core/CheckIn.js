import React, { Fragment, useState, useEffect, useContext } from "react";
import { getClients } from "./common/apiCore";
import Modal from "./common/Modal";
import { ClientContext } from "./common/ClientContext";
import { clientUpdateStatus } from "./common/ClientHelpers";

const CheckIn = () => {
  const [clients, setClients] = useContext(ClientContext);
  const [client, setClient] = useState({});

  const refreshCheckin = () => {
    getClients().then((response) => {
      if (response) {
        if (response.data.error) {
          console.log("Response error: ", response.data.error);
        } else {
          const { checkedIn, serving, checkedOut } = clientUpdateStatus(
            response.data.clients
          );

          setClients((prevClients) => {
            return { checkedIn, serving, checkedOut };
          });
        }
      } else {
        console.log("No response error");
      }
    });
  };

  const { checkedIn } = clients;

  return (
    <Fragment>
      {checkedIn.length == 0 && (
        <div className="row">
          <div className="col-sm-6 offset-sm-3">
            <div
              className="alert alert-success"
              role="alert"
              style={{ textAlign: "center" }}
            >
              <strong>Please check in</strong>
            </div>
          </div>
        </div>
      )}
      {checkedIn.length > 0 && (
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
                {checkedIn.map((client, index) => (
                  <tr
                    data-id={client.id}
                    id="modalLaunch"
                    key={index}
                    onClick={() => setClient(client)}
                    data-toggle="modal"
                    data-target="#checkinModal"
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
        modalId="checkinModal"
        client={client}
        type="serving"
        refreshFunction={refreshCheckin}
      />
    </Fragment>
  );
};

export default CheckIn;
