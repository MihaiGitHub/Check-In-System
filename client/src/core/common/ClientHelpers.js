export const clientUpdateStatus = (clients) => {
  const checkedIn = clients.filter((client) => {
    return client.status === "checkin";
  });

  const serving = clients.filter((client) => {
    return client.status === "serving";
  });

  const checkedOut = clients.filter((client) => {
    return client.status === "checkout";
  });

  return { checkedIn, serving, checkedOut };
};
