import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import CheckInForm from "./core/CheckInForm";
import UpdateClient from "./core/UpdateClient";
import ViewClient from "./core/ViewClient";
import PlaceOfService from "./core/PlaceOfService";
import Main from "./core/Main";
import Login from "./core/Login";

const Routes = () => {
  // browserrouter for going back in browser
  return (
    <HashRouter>
      <Switch>
        <Route path="/placeofservice">
          <PlaceOfService />
        </Route>
        <Route path="/viewclient">
          <ViewClient />
        </Route>
        <Route path="/updateclient">
          <UpdateClient />
        </Route>
        <Route path="/searchclient">
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
