import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/auth";

const Navbar = ({ isLoggedIn }) => {
  const handleClick = () => {
    logout();
  };

  return (
    <div className="nav-bar">
      <header className="trippn-header">
        <h1>trippn</h1>
      </header>
      <nav className="nav-links">
        <Link to="/login" className="nav-link">
          Login
        </Link>
        <Link to="/signup" className="nav-link">
          Signup
        </Link>
        <div className="dropdown">
          <button className="dropbtn">
            Dropdown
            <i className="fa fa-caret-down"></i>
          </button>
          <div className="dropdown-content">
            <a href="#">Dead Link 1</a>
            <a href="#">Dead Link 2</a>
            <a href="#">Dead Link 3</a>
          </div>
        </div>
        <a href="#" className="nav-link" onClick={handleClick}>
            Logout
          </a>
      </nav>
      <hr />
    </div>
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

export default connect(mapState, mapDispatch)(Navbar);
