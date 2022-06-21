import React, { useState, useEffect } from "react";
import { getVisitItems } from "./common/apiCore";

const DisplayItems = ({ client_id }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getVisitItems(client_id).then(({ data }) => {
      setItems(data.items);
    });
  }, []);

  return items.map((item, index) => (
    <li key={index}>
      {item.item} - {item.notes}
    </li>
  ));
};

export default DisplayItems;
