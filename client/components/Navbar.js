import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/auth";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Alert } from "react-bootstrap";
import { useSelector } from "react-redux";

const demoRegex = (firstName) => {
  console.log(firstName);
  const user = firstName;
  const regex = /Demo$/g;
  const result = user.match(regex);
  console.log(result);
  if (result) {
    return true;
  } else {
    return false;
  }
};

const NavigationBar = ({ isLoggedIn, auth }) => {
  const handleClick = () => {
    logout();
  };

  const userFirstName = useSelector((state) => state.auth.firstName);

  const nameForCheckDemo = userFirstName || "";

  const checkedIfDemo = userFirstName ? demoRegex(nameForCheckDemo) : false;

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  padding: "0.2rem",
                }}
              >
                <Navbar.Brand href="/home">
                  <img src="/logo.png" width="45px" height="45px"></img>
                </Navbar.Brand>
                <Navbar.Brand href="/home">trippn</Navbar.Brand>
              </div>
              <div
                style={{
                  position: "absolute",
                  right: "5em",
                  padding: "5em",
                }}
              >
                <Link to="/user" className="navbar-link-user">
                  {auth.firstName}
                </Link>
              </div>
              <div
                style={{
                  position: "absolute",
                  right: "3em",
                }}
              >
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav className="me-auto">
                    <NavDropdown title="My Account" id="collasible-nav-dropdown">
                      <NavDropdown.Item href="/demo" onClick={handleClick}>
                        Browse Demos
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="/update">
                        Update Profile
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="/login" onClick={handleClick}>
                        Sign Out
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                </Navbar.Collapse>
              </div>
            </Container>
          </Navbar>
          {checkedIfDemo ? (
            <Alert
              variant="warning"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Alert.Heading
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <p
                  style={{
                    alighSelf: "flex-start",
                    paddingRight: "50vw",
                  }}
                >
                  You are experiencing Trippn in <strong>Demo Mode</strong>.
                </p>
                <p
                  style={{
                    alignSelf: "flex-end",
                  }}
                >
                  Use <strong>Menu</strong> to logout or browse other demos.
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  fill="currentColor"
                  class="bi bi-arrow-90deg-down"
                  style={{
                    transform: "rotate(180deg)",
                    marginRight: "2rem",
                    marginLeft: "1rem",
                  }}
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.854 14.854a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V3.5A2.5 2.5 0 0 1 6.5 1h8a.5.5 0 0 1 0 1h-8A1.5 1.5 0 0 0 5 3.5v9.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4z"
                  />
                </svg>
              </Alert.Heading>
            </Alert>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <div>
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  padding: "0.2rem",
                }}
              >
                <img src="/logo.png" width="45px" height="45px"></img>
                <Navbar.Brand href="/home" style={{ marginLeft: "1rem" }}>
                  trippn
                </Navbar.Brand>
              </div>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                  <Link to="/login" className="navbar-link">
                    Login
                  </Link>
                  <Link to="/signup" className="navbar-link">
                    Signup
                  </Link>
                  <Link to="/demo" className="navbar-link">
                    Demo
                  </Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
      )}
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    auth: state.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(mapState, mapDispatch)(NavigationBar);
