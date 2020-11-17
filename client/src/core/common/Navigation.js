import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";

const Navigation = ({ logoutFunction, logoutLink, history }) => {
  const isActive = (history, path) => {
    if (history.location.pathname === path) {
      return { color: "#ff9900", textDecoration: "none" };
    } else {
      return { color: "#FFFFFF", textDecoration: "none" };
    }
  };

  return (
    <nav className="navbar navbar-dark bg-dark">
      {!logoutLink && (
        <Link style={style.navLink} to="/storehouse">
          Gods Vast Resources
        </Link>
      )}
      {logoutLink && (
        <Fragment>
          <Link
            style={isActive(history, "/storehouse")}
            to={{
              pathname: "/storehouse",
              state: {
                place: "Storehouse",
              },
            }}
          >
            Storehouse
          </Link>
          <Link
            style={isActive(history, "/foodpantry")}
            to={{
              pathname: "/foodpantry",
              state: {
                place: "Food pantry",
              },
            }}
          >
            Food Pantry
          </Link>
          <Link
            style={isActive(history, "/mrc")}
            to={{
              pathname: "/mrc",
              state: {
                place: "Mobile resource center",
              },
            }}
          >
            Mobile Resource Center
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
