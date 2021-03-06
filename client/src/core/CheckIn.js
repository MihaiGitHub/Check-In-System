import React, { Fragment, useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import { getClients } from "./common/apiCore";
import Modal from "./common/Modal";
import { ClientContext } from "./common/ClientContext";
import { clientUpdateStatus } from "./common/ClientHelpers";
import { errorMessage } from "./common/Error";

const CheckIn = (props) => {
  const [error, setError] = useState(false);
  const [errorMsg, setErrMsg] = useState("");
  const [clients, setClients] = useContext(ClientContext);
  const [client, setClient] = useState({});

  if (props.location.state !== undefined) {
    var { place } = props.location.state;
  } else {
    var place = "Storehouse";
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
                  <th scope="col">Number in family</th>
                  <th scope="col">Specific request</th>
                </tr>
              </thead>
              <tbody>
                {checkedIn.map((client, index) => {
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
                      data-target="#checkinModal"
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
        modalId="checkinModal"
        client={client}
        type="serving"
        refreshFunction={refreshCheckin}
      />
    </Fragment>
  );
};

export default withRouter(CheckIn);
