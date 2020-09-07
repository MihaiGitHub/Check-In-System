import React, { useState, useEffect } from 'react';
import { getClients } from './apiCore';

const Checkin = () => {
  const [ clients, setClients ] = useState([]);

  useEffect(() => {
    getClients().then(response => {
      console.log('response ', response)

      setClients(response.clients);
    });
  }, []);

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
            <tr key={index}>
              <th scope="row">{client.id}</th>
              <td>{client.fname}</td>
              <td>{client.lname}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
};

export default Checkin;