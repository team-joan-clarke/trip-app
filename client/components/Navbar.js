import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/auth";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const NavigationBar = ({ isLoggedIn, auth }) => {
  const handleClick = () => {
    logout();
  };

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
                <img src="/logo.png" width="45px" height="45px"></img>
                <Navbar.Brand href="/home" style={{ marginLeft: "1rem" }}>
                  trippn
                </Navbar.Brand>
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
                    <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
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
