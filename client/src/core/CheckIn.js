import React, { Fragment, useState, useEffect } from "react";
import { getClients } from "./apiCore";

const CheckIn = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    getClients().then(({ data }) => {
      console.log("data ", data);

      setClients(data.clients);
    });
  }, []);
  //data-toggle="modal" data-target="#myModal"
  return (
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
            //    onClick={() => document.getElementById("#myModal").modal()}
          >
            <th scope="row">{client.id}</th>
            <td>{client.fname}</td>
            <td>{client.lname}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CheckIn;
