import { API } from "../config";
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

export const getSession = () => {
  return axios
    .post(`${API}`)
    .then((response) => {
      console.log("response ", response);

      return response;
    })
    .catch((error) => console.log(error));
};

export const getClients = () => {
  return axios
    .post(`https://www.tnfpapp.org/beta/checkin/api/client_list.php`, {
      jwt:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRhIjp7ImlkIjoiOCIsInVzZXJuYW1lIjoiZGVtbyIsInJvbGUiOiJhZG1pbiJ9fQ.7mmHx8yac4i5BbyyZuFZMaCOsNur0uAHM8gbk64euWU",
    })
    .then((response) => {
      return response;
    })
    .catch((error) => console.log(error));
};
