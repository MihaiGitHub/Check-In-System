import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import CheckInForm from "./core/CheckInForm";
import Home from "./core/Home";

const Routes = () => {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-dark bg-dark">
        <Link to="/CheckIn" style={{ color: "white", textDecoration: "none" }}>
          Tucson Neighborhood Food Pantry
        </Link>
      </nav>
      <Switch>
        <Route path="/CheckInForm">
          <CheckInForm />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
