import React, { Fragment, useState, useEffect } from "react";
import { getClients } from "./apiCore";
import Modal from "./Modal";

const CheckIn = () => {
  const [clients, setClients] = useState([]);
  const [client, setClient] = useState({});

  useEffect(() => {
    getClients().then(({ data }) => {
      setClients(data.clients);
    });
  }, []);

  return (
    <Fragment>
      <table className="table table-bordered table-striped mb-0">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
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
              data-target="#clientModal"
            >
              <th scope="row">{client.id}</th>
              <td>{client.fname}</td>
              <td>{client.lname}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal client={client} type="Serving" />
    </Fragment>
  );
};

export default CheckIn;
