import React, { useState, useEffect, createContext } from "react";
import { getClients, getVisitItems } from "./apiCore";

export const ClientContext = createContext();

export const ClientProvider = (props) => {
  var [clients, setClients] = useState({
    place: "",
    checkedIn: [],
    serving: [],
    checkedOut: [],
  });

  useEffect(() => {
    getClients(clients.place).then((response) => {
      if (response) {
        if (response.data.error) {
          console.log("Response error: ", response.data.error);
        } else {
          const checkedIn = response.data.clients.filter((client) => {
            return client.status === "checkin";
          });

          const serving = response.data.clients.filter((client) => {
            return client.status === "serving";
          });

          const checkedOut = response.data.clients.filter((client) => {
            return client.status === "checkout";
          });

          // add items to checked out clients
          checkedOut.map(async (client, index) => {
            await getVisitItems(client.c_id).then(({ data }) => {
              client.items = data.items;
            });
          });

          setClients((prevClients) => {
            return {
              ...prevClients,
              place: clients.place,
              checkedIn,
              serving,
              checkedOut,
            };
          });
        }
      } else {
        console.log("No response error");
      }
    });

    const interval = setInterval(() => {
      getClients(clients.place).then((response) => {
        if (response) {
          if (response.data.error) {
            console.log("Response error: ", response.data.error);
          } else {
            const checkedIn = response.data.clients.filter((client) => {
              return client.status === "checkin";
            });

            const serving = response.data.clients.filter((client) => {
              return client.status === "serving";
            });

            const checkedOut = response.data.clients.filter((client) => {
              return client.status === "checkout";
            });

            setClients((prevClients) => {
              return {
                ...prevClients,
                place: clients.place,
                checkedIn,
                serving,
                checkedOut,
              };
            });
          }
        } else {
          console.log("No response error");
        }
      });
    }, 30000);

    // This is the equivilent of componentWillUnmount in a React Class component.
    return () => clearInterval(interval);
  }, [clients.place, clients.updateCheckout]); // fire whats inside this again when a place changes; component only mounts once, but can re-render (update) multiple times

  return (
    <ClientContext.Provider value={[clients, setClients]}>
      {props.children}
    </ClientContext.Provider>
  );
};
