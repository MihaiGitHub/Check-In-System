import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#ff9900", textDecoration: "none" };
  } else {
    return { color: "#FFFFFF", textDecoration: "none" };
  }
};

const Navigation = ({ logoutFunction, logoutLink, history }) => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      {!logoutLink && (
        <Link style={style.navLink} to="/storehouse">
          Gods Vast Resources
        </Link>
      )}
      {logoutLink && (
        <Fragment>
          <Link style={isActive(history, "/storehouse")} to="/storehouse">
            Storehouse
          </Link>
          <Link style={isActive(history, "/foodpantry")} to="foodpantry">
            Food Pantry
          </Link>
          <Link style={isActive(history, "/mrc")} to="mrc">
            Mobile Resource Center
          </Link>
          <Link style={style.navLink} onClick={logoutFunction} to="#">
            Clear Check Out
          </Link>
          <Link style={style.navLink} onClick={logoutFunction} to="#">
            Log out
          </Link>
        </Fragment>
      )}
    </nav>
  );
};

const style = {
  navLink: {
    color: "#FFFFFF",
    textDecoration: "none",
  },
};

export default withRouter(Navigation);
