import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './components/Home';
import CheckInForm from './components/CheckInForm';

export default function App() {

    return (
      <Router>
        <nav className="navbar navbar-dark bg-dark">
            <Link to="/CheckIn" style={{ color: 'white', textDecoration: 'none' }}>
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
      </Router>
    );
}