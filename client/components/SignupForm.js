import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { authenticateSignUp } from "../redux/auth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button, Alert } from "react-bootstrap";
import axios from "axios"

//PHONE NUMBER VALIDATION:
function validatePhoneNumber(input_str) {
  var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

  return re.test(input_str);
}

const SignUpForm = (props) => {
  const { error } = props;
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  useEffect(() => {
    if (props.auth.id) {
      navigate("/user");
    }
  }, []);

  let errorMessage;

  if (error) {
    if (
      error.response.data ===
      "Validation error: Validation isEmail on email failed"
    ) {
      errorMessage =
        "Email input must be a valid email address Ex:___@gmail.com ";
    }
    if (error.response.data === "User already exists") {
      errorMessage =
        "There is an existing user with this username and/or email";
    }
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const firstName = evt.target.firstName.value;
    const lastName = evt.target.lastName.value;
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    const email = evt.target.email.value;
    const phoneNumber = evt.target.phoneNumber.value;
    const referralEmail = evt.target.referralEmail.value
    
    if (phoneNumber) {
      if (!validatePhoneNumber(phoneNumber)) {
        return setShow(true);
      }
    }
    
    props.authenticateSignUp(
      firstName,
      lastName,
      username,
      password,
      email,
      phoneNumber,
      referralEmail
    );
  };

  return (
    <div>
      <div
        style={{
          width: "50%",
          flexDirection: "row",
          padding: "2rem",
          borderRadius: "5px",
          boxShadow: "2px 1px 20px grey",
          margin: "5rem auto",
          backgroundImage: "url(/gradient2.png)",
          opacity: "0.9",
          backgroundSize: "cover",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "80%",
            margin: "auto",
            flexDirection: "column",
            padding: "none",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h3>Create Account</h3>
          <form onSubmit={handleSubmit} className="trip-form">
            {/* {Phone number validation:} */}
            <div>
              <Alert show={show} variant="warning">
                <Alert.Heading>
                  Please fix the following before proceeding:
                </Alert.Heading>
                <p style={{ display: "block" }}>
                  Phone numbers may ONLY contain numbers, parenthesis, and or
                  dashes.
                </p>
                <hr />
                <div className="d-flex justify-content-end">
                  <Button
                    onClick={() => setShow(false)}
                    variant="secondary"
                    style={{
                      marginRight: "1rem",
                      borderRadius: "50px",
                      float: "right",
                    }}
                  >
                    Close
                  </Button>
                </div>
              </Alert>
            </div>

            <div>
              <small style={{ float: "right", color: "red" }}>*</small>
              <input
                name="firstName"
                placeholder="First Name"
                type="text"
                required
                style={{ marginRight: "1rem" }}
              />
            </div>
            <div>
              <small style={{ float: "right", color: "red" }}>*</small>

              <input
                name="lastName"
                placeholder="Last Name"
                type="text"
                required
              />
            </div>
            <div>
              <small style={{ float: "right", color: "red" }}>*</small>

              <input
                name="username"
                placeholder="Username"
                type="text"
                required
              />
            </div>
            <div>
              <small style={{ float: "right", color: "red" }}>*</small>

              <input
                name="password"
                placeholder="Password "
                type="password"
                minLength="8"
                maxLength="16"
                required
              />
            </div>
            <div>

              <small style={{ float: "right", color: "red" }}>*</small>

              <input name="email" placeholder="Your email" type="text" required />

            </div>
            <div>
              <input
                type="tel"
                placeholder="Phone(optional)"
                name="phoneNumber"
              />
              <input
                type="referralEmail"
                placeholder="Referral email(optional)"
                name="referralEmail"
              />
            </div>
            <Button style={{ margin: "0.6rem 3.5rem" }} type="submit">
              Register
            </Button>
            <Link className="sign-in-link" to={`/login`}>
              <p style={{ marginLeft: "0.5rem" }}>Already have an account?</p>
            </Link>
            <small style={{ color: "red" }}>* indicates required field</small>
            {/* {error && error.response && <div> {error.response.data} </div>} */}
            {error && error.response && <div> {errorMessage} </div>}
          </form>
        </div>
      </div>
    </div>
  );
};

const mapSignup = (state) => {
  return {
    error: state.auth.error,
    auth: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    authenticateSignUp: (
      firstName,
      lastName,
      username,
      password,
      email,
      phoneNumber,
      referralEmail
    ) =>
      dispatch(
        authenticateSignUp(
          firstName,
          lastName,
          username,
          password,
          email,
          phoneNumber,
          referralEmail
        )
      ),
  };
};

export const Signup = connect(mapSignup, mapDispatch)(SignUpForm);
