import React, { useEffect } from "react";
import { connect } from "react-redux";
import auth, { authenticateLogin } from "../redux/auth";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const LoginForm = (props) => {
  const { error } = props;
  const navigate = useNavigate();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    props.authenticateLogin(username, password);
  };

  useEffect(() => {
    if (props.auth.id) {
      navigate("/user");
    }
  }, []);

  return (
    <div>
      <div
        style={{
          width: "40%",
          flexDirection: "row",
          padding: "2rem",
          borderRadius: "5px",
          boxShadow: "2px 1px 20px grey",
          margin: "10rem auto",
          backgroundImage: "url(/gradient1.png)",
          opacity: '0.9',
          backgroundSize: 'cover'
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
          <h3>Log In</h3>
          <form onSubmit={handleSubmit} className="trip-form">
            <div>
              <input name="username" placeholder="Username" type="text" />
            </div>
            <div>
              <input name="password" placeholder="Password" type="password" />
            </div>
            <div>
              <Button style={{ margin: "0.6rem 4rem" }} type="submit">
                Sign In
              </Button>
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
