import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Checkout from "./Checkout";
import Serving from "./Serving";
import CheckIn from "./CheckIn";
import Modal from "./Modal";

const Main = () => {
  return (
    <Fragment>
      <section id="tabs">
        <div className="container" style={{ maxWidth: "100%" }}>
          <div className="row">
            <div className="col-xs-12" style={{ width: "100%" }}>
              <nav>
                <div
                  className="nav nav-tabs nav-fill"
                  id="nav-tab"
                  role="tablist"
                  style={{ backgroundColor: "white" }}
                >
                  <a
                    className="nav-item nav-link active"
                    id="nav-home-tab"
                    data-toggle="tab"
                    href="#nav-home"
                    role="tab"
                    aria-controls="nav-home"
                    aria-selected="true"
                  >
                    Check In
                  </a>
                  <a
                    className="nav-item nav-link"
                    id="nav-profile-tab"
                    data-toggle="tab"
                    href="#nav-profile"
                    role="tab"
                    aria-controls="nav-profile"
                    aria-selected="false"
                  >
                    Serving
                  </a>
                  <a
                    className="nav-item nav-link"
                    id="nav-about-tab"
                    data-toggle="tab"
                    href="#nav-about"
                    role="tab"
                    aria-controls="nav-about"
                    aria-selected="false"
                  >
                    Check Out
                  </a>
                </div>
              </nav>
              <div
                className="tab-content py-3 px-3 px-sm-0"
                id="nav-tabContent"
              >
                <div
                  className="tab-pane fade show active"
                  id="nav-home"
                  role="tabpanel"
                  aria-labelledby="nav-home-tab"
                >
                  <div className="table-wrapper-scroll-y my-custom-scrollbar">
                    <CheckIn />
                  </div>
                  <Link to="/CheckInForm" style={{ textDecoration: "none" }}>
                    <button
                      type="button"
                      className="btn btn-success btn-lg btn-block"
                    >
                      Check In
                    </button>
                  </Link>
                </div>
                <div
                  className="tab-pane fade"
                  id="nav-profile"
                  role="tabpanel"
                  aria-labelledby="nav-profile-tab"
                >
                  <div className="table-wrapper-scroll-y my-custom-scrollbar">
                    <Serving />
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="nav-about"
                  role="tabpanel"
                  aria-labelledby="nav-about-tab"
                >
                  <div className="table-wrapper-scroll-y my-custom-scrollbar">
                    <Checkout />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Modal />
    </Fragment>
  );
};

export default Main;