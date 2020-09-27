import React, { useState, useEffect } from "react";
import { getSession } from "./apiCore";
import Main from "./Main";

const Home = () => {
  const [auth, setAuth] = useState(true);
  const [error, setError] = useState(false);

  const init = () => {
    // getSession().then(({ data }) => {
    //   if (!data.auth) {
    //     setAuth(false);
    //     setError(true);
    //   }
    // });
  };

  useEffect(() => {
    init();
  }, []);

  const showLoginError = () => (
    <div className="alert alert-danger mt-5" role="alert">
      <h4 className="alert-heading">Login Error!</h4>
      <p>
        You must be logged in to the TNFP client system to access the Check In
        System. Please login at the link below then refresh this page:
      </p>
      <hr />
      <p className="mb-0">
        <a href="https://www.tnfpapp.org/beta/#/login" target="_blank">
          TNFP Login
        </a>
      </p>
    </div>
  );

  return (
    <main role="main" className="container" style={{ maxWidth: "100%" }}>
      {error && showLoginError()}
      {auth && <Main />}
    </main>
  );
};

export default Home;
