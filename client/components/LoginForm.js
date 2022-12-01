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
      <h3>Log In</h3>
      <form onSubmit={handleSubmit} className='trip-form'>
        <div>
          <input name="username" placeholder='Username' type="text" />
        </div>
        <div>
          <input name="password" placeholder='Password' type="password" />
        </div>
        <div>
          <button className="btn-primary" type="submit">Sign In</button>
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