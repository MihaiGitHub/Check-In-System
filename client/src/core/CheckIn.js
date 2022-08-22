import React, { Fragment, useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import { getClients } from "./common/apiCore";
import Modal from "./common/Modal";
import { ClientContext } from "./common/ClientContext";
import { clientUpdateStatus } from "./common/ClientHelpers";
import { errorMessage } from "./common/Error";
import DisplayItems from "./DisplayItems";

const CheckIn = (props) => {
  const [error, setError] = useState(false);
  const [errorMsg, setErrMsg] = useState("");
  const [clients, setClients] = useContext(ClientContext);
  const [client, setClient] = useState({});

  if (props.place !== undefined) {
    var place = props.place;
  } else {
    var place = "Clothing Bank";
  }

  useEffect(() => {
    setClients((prevClients) => {
      return {
        ...prevClients,
        place,
      };
    });
  }, []);

  const refreshCheckin = () => {
    getClients(place).then((response) => {
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

  const { checkedIn } = clients;

  return (
    <Fragment>
      {error && errorMessage(errorMsg)}

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
                  <th scope="col"># in House</th>
                  <th scope="col">Specific request</th>
                  <th scope="col">Method of Pickup</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {checkedIn.map((client, index) => {
                  return (
                    <tr data-id={client.id} id="modalLaunch" key={index}>
                      <th scope="row">{index + 1}</th>
                      <td
                        onClick={() => setClient(client)}
                        data-toggle="modal"
                        data-target="#checkinModal"
                      >
                        {client.fname}
                      </td>
                      <td
                        onClick={() => setClient(client)}
                        data-toggle="modal"
                        data-target="#checkinModal"
                      >
                        {client.lname}
                      </td>
                      <td
                        onClick={() => setClient(client)}
                        data-toggle="modal"
                        data-target="#checkinModal"
                      >
                        {client.familyNumber}
                      </td>
                      <td
                        onClick={() => setClient(client)}
                        data-toggle="modal"
                        data-target="#checkinModal"
                      >
                        <ul>
                          {client.items && (
                            <DisplayItems items={client.items} />
                          )}
                        </ul>
                      </td>
                      <td
                        onClick={() => setClient(client)}
                        data-toggle="modal"
                        data-target="#checkinModal"
                      >
                        {client.methodOfPickup}
                      </td>
                      <td>
                        <button
                          onClick={() => setClient(client)}
                          type="button"
                          className="btn btn-secondary btn-sm"
                          data-toggle="modal"
                          data-target="#editModal"
                        >
                          Edit
                        </button>
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
        modalId="checkinModal"
        client={client}
        type="serving"
        refreshFunction={refreshCheckin}
      />
      <Modal
        modalId="editModal"
        client={client}
        type="editCheckin"
        refreshFunction={refreshCheckin}
      />
    </Fragment>
  );
};

export default withRouter(CheckIn);
