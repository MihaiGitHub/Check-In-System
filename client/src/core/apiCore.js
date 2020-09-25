import { API } from "../config";
import axios from "axios";

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
    .get(`${API}?clients=all`)
    .then((response) => {
      return response;
    })
    .catch((error) => console.log(error));
};
