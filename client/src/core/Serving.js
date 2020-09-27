import React, { Fragment, useState } from "react";

const Serving = () => {
  const [client, setClient] = useState("");

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
          <tr
            onClick={() => setClient("Mihai")}
            data-toggle="modal"
            data-id="1"
            data-toggle="modal"
            data-target="#exampleModalLong"
          >
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
          </tr>
          <tr data-toggle="modal" data-id="1" data-target="#servingModal">
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
          </tr>
          <tr data-toggle="modal" data-id="1" data-target="#servingModal">
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
          </tr>
          <tr data-toggle="modal" data-id="1" data-target="#servingModal">
            <th scope="row">4</th>
            <td>Mark</td>
            <td>Otto</td>
          </tr>
          <tr data-toggle="modal" data-id="1" data-target="#servingModal">
            <th scope="row">5</th>
            <td>Jacob</td>
            <td>Thornton</td>
          </tr>
          <tr data-toggle="modal" data-id="1" data-target="#servingModal">
            <th scope="row">6</th>
            <td>Larry</td>
            <td>the Bird</td>
          </tr>
          <tr data-toggle="modal" data-id="1" data-target="#servingModal">
            <th scope="row">7</th>
            <td>Jacob</td>
            <td>Thornton</td>
          </tr>
          <tr data-toggle="modal" data-id="1" data-target="#servingModal">
            <th scope="row">8</th>
            <td>Jacob</td>
            <td>Thornton</td>
          </tr>
        </tbody>
      </table>
    </Fragment>
  );
};

export default Serving;
