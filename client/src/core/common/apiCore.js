import { API } from "../../config";
import axios from "axios";

export const doLogin = ({ username, password }) => {
  return axios
    .post(`${API}/user_login.php`, {
      username,
      password,
    })
    .then((response) => response)
    .catch((error) => console.log(error));
};

export const getClients = () => {
  const jwt = sessionStorage.getItem("jwt");

  return axios
    .post(`${API}/client_list.php`, {
      jwt,
    })
    .then((response) => {
      return response;
    })
    .catch((error) => console.log(error));
};

export const saveClient = (client) => {
  const jwt = sessionStorage.getItem("jwt");

  return axios
    .post(`${API}/client_save.php`, {
      client,
      jwt,
    })
    .then((response) => response)
    .catch((error) => console.log(error));
};

export const updateClientStatus = (id, status) => {
  const jwt = sessionStorage.getItem("jwt");

  return axios
    .post(`${API}/client_update_status.php`, { id, status, jwt })
    .then((response) => response)
    .catch((error) => console.log(error));
};

export const getClient = (email) => {
  const jwt = sessionStorage.getItem("jwt");

  return axios
    .post(`${API}/client_detail.php`, { email, jwt })
    .then((response) => response)
    .catch((error) => console.log(error));
};

export const updateClientInfo = (client) => {
  const jwt = sessionStorage.getItem("jwt");

  return axios
    .post(`${API}/client_update_info.php`, { client, jwt })
    .then((response) => response)
    .catch((error) => console.log(error));
};

export const saveClientVisit = visit => {
  const jwt = sessionStorage.getItem("jwt");

  return axios
  .post(`${API}/client_save_visit.php`, { visit, jwt })
  .then((response) => response)
  .catch((error) => console.log(error));
};