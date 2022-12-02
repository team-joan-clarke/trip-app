import React from "react";
import { connect } from "react-redux";
import { authenticateLogin } from "../redux/auth";

/**
 * COMPONENT
 */
const LoginForm = (props) => {
  const { error } = props;

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    props.authenticateLogin(username, password);
  };

  return (
    <div>
      <div
        style={{
          width: "40%",
          flexDirection: "row",
          flexWrap: "wrap",
          padding: "2rem",
          borderRadius: "5px",
          boxShadow: "2px 1px 20px grey",
          margin: "10rem auto",
        }}
      >
        <h3>Log In</h3>
        <div
          style={{
            display: "flex",
            width: "80%",
            margin: "auto",
            flexDirection: "row",
            flexWrap: "wrap",
            padding: "none",
            justifyContent: "center",
          }}
        >
          <form onSubmit={handleSubmit} className="trip-form">
            <div>
              <input name="username" placeholder="Username" type="text" />
            </div>
            <div>
              <input name="password" placeholder="Password" type="password" />
            </div>
            <div>
              <button className="btn-primary" type="submit">
                Sign In
              </button>
            </div>
            {error && error.response && <div> {error.response.data} </div>}
          </form>
        </div>
      </div>
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

export const Login = connect(mapLogin, mapDispatch)(LoginForm);
