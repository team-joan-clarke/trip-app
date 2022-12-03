import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/auth";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const NavigationBar = ({ isLoggedIn }) => {
  const handleClick = () => {
    logout();
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/home">trippn</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/signup">Signup</Nav.Link>
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Dead Link</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Dead Link</NavDropdown.Item>
              <NavDropdown.Item href="/update">Update Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/dummydash">dummy dash</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="/user">User Dashboard</Nav.Link>
            <Nav.Link href="/" onClick={handleClick}>
              Sign Out
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(mapState, mapDispatch)(NavigationBar);
