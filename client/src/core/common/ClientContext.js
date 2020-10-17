import React, { useState, useEffect, createContext } from "react";
import { getClients } from "./apiCore";

export const ClientContext = createContext();

export const ClientProvider = (props) => {
  const [clients, setClients] = useState({
    checkedIn: [],
    serving: [],
    checkedOut: [],
  });

  useEffect(() => {
    getClients().then((response) => {
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

          setClients({ checkedIn, serving, checkedOut });
        }
      } else {
        console.log("No response error");
      }
    });

    const interval = setInterval(() => {
      getClients().then((response) => {
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

            setClients({ checkedIn, serving, checkedOut });
          }
        } else {
          console.log("No response error");
        }
      });
    }, 30000);

    // This is the equivilent of componentWillUnmount in a React Class component.
    return () => clearInterval(interval);
  }, []);

  return (
    <ClientContext.Provider value={[clients, setClients]}>
      {props.children}
    </ClientContext.Provider>
  );
};
