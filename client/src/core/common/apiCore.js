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

export const getClients = (placeOfService) => {
  const jwt = sessionStorage.getItem("jwt");

  return axios
    .post(`${API}/client_list.php`, {
      jwt,
      placeOfService,
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

export const updateClientStatus = (client) => {
  const jwt = sessionStorage.getItem("jwt");

  return axios
    .post(`${API}/client_update_status.php`, { client, jwt })
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

export const getClientById = (id) => {
  const jwt = sessionStorage.getItem("jwt");

  return axios
    .post(`${API}/client_detail_by_id.php`, { id, jwt })
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

export const registerClient = (client) => {
  const jwt = sessionStorage.getItem("jwt");

  return axios
    .post(`${API}/client_register.php`, { client, jwt })
    .then((response) => response)
    .catch((error) => console.log(error));
};

export const saveClientVisitItem = (visit) => {
  const jwt = sessionStorage.getItem("jwt");

  return axios
    .post(`${API}/client_save_visit_items.php`, { visit, jwt })
    .then((response) => response)
    .catch((error) => console.log(error));
};

export const saveClientVisitItems = (visit) => {
  const jwt = sessionStorage.getItem("jwt");

  return axios
    .post(`${API}/save_visit_items.php`, { visit, jwt })
    .then((response) => response)
    .catch((error) => console.log(error));
};

export const getPlaceOfService = () => {
  const jwt = sessionStorage.getItem("jwt");

  return axios
    .post(`${API}/item_placeofservice.php`, { jwt })
    .then((response) => response)
    .catch((error) => console.log(error));
};

export const getItems = (place_of_service) => {
  const jwt = sessionStorage.getItem("jwt");

  return axios
    .post(`${API}/items.php`, { place_of_service, jwt })
    .then((response) => response)
    .catch((error) => console.log(error));
};

export const clearCheckout = (placeOfService) => {
  const jwt = sessionStorage.getItem("jwt");

  return axios
    .post(`${API}/client_checkout.php`, { placeOfService, jwt })
    .then((response) => response)
    .catch((error) => console.log(error));
};

export const getVisitItems = (client_id) => {
  const jwt = sessionStorage.getItem("jwt");

  return axios
    .post(`${API}/visit_items.php`, { client_id, jwt })
    .then((response) => response)
    .catch((error) => console.log(error));
};

export const updateCheckinItems = (
  client_id,
  placeOfService,
  methodOfPickup,
  items
) => {
  const jwt = sessionStorage.getItem("jwt");

  return axios
    .post(`${API}/update_visit_items.php`, {
      client_id,
      placeOfService,
      methodOfPickup,
      items,
      jwt,
    })
    .then((response) => response)
    .catch((error) => console.log(error));
};
