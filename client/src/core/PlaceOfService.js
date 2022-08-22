import React, { Fragment, useState, useEffect } from "react";
import { Redirect, withRouter, useHistory } from "react-router-dom";
import Navigation from "./common/Navigation";
import { errorMessage } from "./common/Error";
import { getPlaceOfService, getItems, saveClient } from "./common/apiCore";

const PlaceOfService = (props) => {
  const [error, setError] = useState(false);
  const [errorMsg, setErrMsg] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [places, setPlaces] = useState([]);
  const history = useHistory();

  const [methodsOfPickup, setMethodsOfPickup] = useState([
    "Drive-Thru",
    "Walk-Up",
  ]);

  // all items at the selected place
  const [items, setItems] = useState([]);

  // items checked
  const [clientItems, setClientItems] = useState([]);
  const [clientPlaceOfService, setClientPlaceOfService] = useState("");
  const [clientMethodOfPickup, setClientMethodOfPickup] = useState("");

  useEffect(() => {
    console.log("component mounted");

    if (!sessionStorage.getItem("jwt")) {
      setRedirect(true);
    }

    getPlaceOfService().then((response) => {
      if (response) {
        if (response.data.error) {
          setError(true);
          setErrMsg(response.data.error);
        } else {
          setError(false);
          setPlaces(response.data.places);
        }
      } else {
        setError(true);
        setErrMsg("No response from server");
      }
    });

    return () => {
      console.log("component unmounted");
    };
  }, []);

  // callback for when client updates their items
  useEffect(() => {
    console.log("component updated due to items changing");
  }, [clientItems]);

  // redirect if client is not defined
  if (typeof props.location.state === "undefined") {
    return <Redirect to="/" />;
  }

  if (redirect) {
    let defaultPlace = "";
    switch (clientPlaceOfService) {
      case "Food pantry":
        defaultPlace = "foodpantry";
        break;
      case "Mobile Resource Center":
        defaultPlace = "mrc";
        break;
      default:
        defaultPlace = "storehouse";
    }

    return (
      <Redirect
        to={{
          pathname: `/${defaultPlace}`,
        }}
      />
    );
  }

  const doLogout = () => {
    sessionStorage.setItem("jwt", "");
    sessionStorage.clear();
    setRedirect(true);
  };

  const handleMethod = (name) => (event) => {
    setClientMethodOfPickup(event.target.value);
  };

  const handlePlace = (name) => (event) => {
    // clear checkboxes after place switch
    let inputs = document.querySelectorAll(".form-check-input");

    for (let i = 0; i < inputs.length; i++) {
      inputs[i].checked = false;
    }

    // clear items selected after place switch
    setClientItems([]);

    // set client place of service
    setClientPlaceOfService(event.target.value);

    getItems(event.target.value).then((response) => {
      if (response) {
        if (response.data.error) {
          setError(true);
          setErrMsg(response.data.error);
        } else {
          setError(false);
          setItems(response.data.items);
        }
      } else {
        setError(true);
        setErrMsg("No response from server");
      }
    });
  };

  const handleItems = (name) => (event) => {
    if (event.target.checked) {
      setClientItems([...clientItems, event.target.value]);
    } else {
      let clientItemsFilter = clientItems.filter(
        (item) => item !== event.target.value
      );
      setClientItems(clientItemsFilter);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (clientItems.length === 0 || clientMethodOfPickup === "") {
      setError(true);
      setErrMsg("Please fill in all the information");
      return false;
    }

    const { client } = props.location.state;

    const clientUpdated = {
      fname: client.fname,
      lname: client.lname,
      status: "checkin",
      familyNumber: client.inhouse,
      placeOfService: clientPlaceOfService,
      items: clientItems,
      email: client.email,
      methodOfPickup: clientMethodOfPickup,
    };

    saveClient(clientUpdated).then((response) => {
      if (response) {
        if (response.data.error) {
          setError(true);
          setErrMsg(response.data.error);
        } else {
          setError(false);
          setRedirect(true);
        }
      } else {
        setError(true);
        setErrMsg("No response from server");
      }
    });
  };

  const form = () => (
    <form style={{ padding: 15 }}>
      <div className="form-row">
        <div className="form-group mx-auto" style={{ width: 400 }}>
          <div className="form-group col-sm">
            <label htmlFor="inputPlaceOfService">
              <strong>Place Of Service</strong>
            </label>
            <select
              onChange={handlePlace("place_of_service")}
              className="custom-select"
              id="placeOfService"
            >
              <option defaultValue value="0">
                Choose...
              </option>
              {places.map((place, index) => (
                <option key={index} value={place.place_of_service}>
                  {place.place_of_service}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group col-sm">
            <label>
              <strong>Method of pickup</strong>
            </label>
            <select
              onChange={handleMethod("method_of_pickup")}
              className="custom-select"
              id="methodsOfPickup"
            >
              <option defaultValue value="0">
                Choose...
              </option>
              {methodsOfPickup.map((method, index) => (
                <option key={index} value={method}>
                  {method}
                </option>
              ))}
            </select>
          </div>

          <div
            className="form-group col-sm"
            style={{ display: items.length > 0 ? "block" : "none" }}
          >
            <label>
              <strong>Items</strong>
            </label>

            {items.map((item, index) => (
              <div className="form-check" key={index}>
                <input
                  onChange={handleItems(index)}
                  className="form-check-input"
                  type="checkbox"
                  value={item.name}
                  id={index}
                />
                <label className="form-check-label" htmlFor={index}>
                  {item.name}
                </label>
              </div>
            ))}
          </div>

          <div className="form-group col-sm">
            <button
              onClick={handleSubmit}
              className="btn btn-success btn-lg btn-block"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  );

  return (
    <Fragment>
      <Navigation logoutFunction={doLogout} logoutLink={true} />
      {error && errorMessage(errorMsg)}
      {form()}
    </Fragment>
  );
};

export default withRouter(PlaceOfService);
