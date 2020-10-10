import React from "react";
import { Link } from "react-router-dom";

const Navigation = ({ logoutFunction, logoutLink }) => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <Link style={style.navLink} to="/main">
        Tucson Neighborhood Food Pantry
      </Link>
      {logoutLink && (
        <Link style={style.navLink} onClick={logoutFunction} to="#">
          Log out
        </Link>
      )}
    </nav>
  );
};

const style = {
  navLink: {
    color: "white",
    textDecoration: "none",
  },
};

export default Navigation;
