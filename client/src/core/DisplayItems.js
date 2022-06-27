import React from "react";

const DisplayItems = ({ items }) => {
  return items.map((item, index) => (
    <li key={index}>
      {item.item} - {item.notes}
    </li>
  ));
};

export default DisplayItems;
