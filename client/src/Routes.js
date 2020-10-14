import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import CheckInForm from "./core/CheckInForm";
import UpdateClient from "./core/UpdateClient";
import Main from "./core/Main";
import Login from "./core/Login";

const Routes = () => {
  return (
    <HashRouter>
      <Switch>
        <Route path="/updateclient">
          <UpdateClient />
        </Route>
        <Route path="/saveclient">
          <CheckInForm />
        </Route>
        <Route path="/main">
          <Main />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </HashRouter>
  );
};

export default Routes;
