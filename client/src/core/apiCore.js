import { API } from '../config';

export const getClients = () => {
  return fetch(`${API}`)
    .then(response => response.json());
}