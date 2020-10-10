import React from "react";

export const errorMessage = (message) => (
  <div className="alert alert-danger" role="alert">
    <b>Error!</b> {message}
  </div>
);
