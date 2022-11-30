import React from "react";
import { connect } from "react-redux";
import { authenticateSignUp } from "../redux/auth";

/**
 * COMPONENT
 */
const SignUpForm = (props) => {
  const { error } = props;

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const firstName = evt.target.firstName.value;
    const lastName = evt.target.lastName.value;
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    const email = evt.target.email.value;
    const phoneNumber = evt.target.phoneNumber.value;
    props.authenticateSignUp(
      firstName,
      lastName,
      username,
      password,
      email,
      phoneNumber,
    );
  };

  return (
    <div>
      <h3>Sign Up Here</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">
            <small>First Name</small>
          </label>
          <input name="firstName" type="text" />
        </div>
        <div>
          <label htmlFor="lastName">
            <small>Last Name</small>
          </label>
          <input name="lastName" type="text" />
        </div>
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
          <label htmlFor="email">
            <small>E-mail</small>
          </label>
          <input name="email" type="text" />
        </div>
        <div>
          <label htmlFor="phoneNumber">
            <small>Phone Number</small>
          </label>
          <input name="phoneNumber" type="text" />
        </div>
        <div>
          <button className="signup" type="submit">Sign Up</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  );
};


const mapSignup = (state) => {
  return {
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    authenticateSignUp: (firstName, lastName, username, password, email, phoneNumber) =>
      dispatch(
        authenticateSignUp(firstName, lastName, username, password, email, phoneNumber)
      ),
  };
};

export const Signup = connect(mapSignup, mapDispatch)(SignUpForm);