import React, { Fragment, useState, useEffect } from "react";
import { getClients } from "./apiCore";
import Modal from "./Modal";

const CheckIn = () => {
  const [clients, setClients] = useState([]);
  const [client, setClient] = useState({});

  useEffect(() => {
    getClients("checkin").then((response) => {
      if (response) {
        if (response.data.error) {
          console.log("Response error: ", response.data.error);
        } else {
          setClients(response.data.clients);
        }
      } else {
        console.log("No response error");
      }
    });
  }, []);

  const refreshCheckin = () => {
    getClients("checkin").then(({ data }) => {
      if (!data.error) {
        setClients(data.clients);
      } else {
        setClients([]);
      }
    });
  };

  return (
    <Fragment>
      {clients.length == 0 && (
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
      {clients.length > 0 && (
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
                {clients.map((client, index) => (
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
