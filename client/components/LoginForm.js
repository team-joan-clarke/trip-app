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
      <h3>Log In Here</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">
            <small>Username</small>
          </label>
          <input name="username" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <button className="login" type="submit">Log In</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  );
};

const mapLogin = (state) => {
  return {
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    authenticateLogin: (username, password) =>
      dispatch(authenticateLogin(username, password)),
  };
};

export const Login = connect(mapLogin, mapDispatch)(LoginForm);