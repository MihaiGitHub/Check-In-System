import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import CheckIn from './components/CheckIn';
import CheckInForm from './components/CheckInForm';

export default function App() {

    return (
      <Router>
        <nav className="navbar navbar-dark bg-dark">
            <Link to="/CheckIn" style={{ color: 'white', textDecoration: 'none' }}>
            <img src="https://static.wixstatic.com/media/5b7a8b_794550fc91634cc2b734cb1eb8afc2ba~mv2.jpg/v1/fill/w_325,h_165,al_c,q_80/5b7a8b_794550fc91634cc2b734cb1eb8afc2ba~mv2.webp" width="30" height="30" className="d-inline-block align-top" alt="" />
                &nbsp;Tucson Neighborhood Food Pantry
            </Link>
        </nav>
          <Switch>
            <Route path="/CheckInForm">
              <CheckInForm />
            </Route>
            <Route path="/">
              <CheckIn />
            </Route>
          </Switch>
      </Router>
    );
}