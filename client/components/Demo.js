import React, { Component } from "react";
import { connect } from "react-redux";
import { useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import auth, { authenticateLogin } from "../redux/auth";
import { useNavigate } from "react-router-dom";

const Demo = (props) => {
  const { error } = props;
  const navigate = useNavigate();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log("in handle");
    console.log("un", evt.target.value);
    const demCred = evt.target.value.split(" ");
    props.authenticateLogin(demCred[0], demCred[1]);
  };

  useEffect(() => {
    if (props.auth.id) {
      navigate("/user");
    }
  }, []);
  return (
    <div>
      <main>
        <div
          style={{
            display: "flex",
            width: "auto",
            widthMax: "70%",
            flexDirection: "column",
            flexWrap: "wrap",
            padding: "2rem",
            borderRadius: "5px",
            boxShadow: "2px 1px 20px grey",
            margin: "8rem",
            alignItems: "center",
          }}
        >
          <h1>Start trippn today.</h1>
          <h2>Not ready for takeoff quite yet?</h2>
          <h3>
            Explore the trippn trip task management system by demoing the
            experiences below.
          </h3>
          <div
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              borderBottom: "2px solid #D3D3D3",
              marginBottom: "3rem",
            }}
          >
            <Button
              size="lg"
              style={{ margin: "2rem", width: "10rem" }}
              value="ben pwben"
              onClick={handleSubmit}
            >
              Ben
            </Button>
            <Button
              size="lg"
              style={{ margin: "2rem", width: "10rem" }}
              value="sara2 pwsara"
              onClick={handleSubmit}
            >
              Sara
            </Button>
            <Button
              size="lg"
              style={{ margin: "2rem", width: "10rem" }}
              value="darian pwdarian"
              onClick={handleSubmit}
            >
              Darian
            </Button>
          </div>

          <h3>Here's how we help:</h3>
          <ul>
            <li>Create a new trip and invite travel companions</li>
            <li>Add, edit, and assign tasks to trip members</li>
            <li>View a shared trip dashboard to centralize trip information</li>
            <li>View multiple upcoming and past trips</li>
          </ul>
        </div>
      </main>
    </div>
  );
};

const mapLogin = (state) => {
  return {
    error: state.auth.error,
    auth: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    authenticateLogin: (username, password) =>
      dispatch(authenticateLogin(username, password)),
  };
};

export default connect(mapLogin, mapDispatch)(Demo);
