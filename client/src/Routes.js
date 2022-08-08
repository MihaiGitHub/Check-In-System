import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import SearchClient from "./core/SearchClient";
import UpdateClient from "./core/UpdateClient";
import RegisterClient from "./core/RegisterClient";
import ViewClient from "./core/ViewClient";
import PlaceOfService from "./core/PlaceOfService";
import Storehouse from "./core/Storehouse";
import FoodPantry from "./core/FoodPantry";
import MRC from "./core/MRC";
import Login from "./core/Login";

const Routes = () => {
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
        <Route path="/registerclient">
          <RegisterClient />
        </Route>
        <Route path="/searchclient">
          <SearchClient />
        </Route>
        <Route path="/storehouse">
          <Storehouse />
        </Route>
        <Route path="/foodpantry">
          <FoodPantry />
        </Route>
        <Route path="/mrc">
          <MRC />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </HashRouter>
  );
};

export default Routes;
