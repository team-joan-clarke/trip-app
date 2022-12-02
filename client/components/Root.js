import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SingleUser from "./SingleUser";
import UpdateUserForm from "./UpdateUserForm";
import SingleTrip from "./SingleTrip";
import { Signup } from "./SignupForm";
import { Login } from "./LoginForm";
import NavigationBar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import { verified } from "../redux/auth";

const Root = ({ isLoggedIn }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verified());
  }, []);

  return (
    <BrowserRouter>
      <div>
        {isLoggedIn ? (
          <div>
            <NavigationBar />
            <Routes>
              <Route exact path="/user" element={<SingleUser />} />
              <Route exact path="/trip/:tripId" element={<SingleTrip />} />
              <Route exact path="/update" element={<UpdateUserForm />} />
              {/* <Route path="/redirect" element={<Navigate to="/user" />} /> */}
            </Routes>
          </div>
        ) : (
          <div>
            <div>
              <NavigationBar />
              <Routes>
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/signup" element={<Signup />} />
                {/* <Route path="/redirect" element={<Navigate to="/user" />} /> */}
              </Routes>
            </div>
          </div>
        )}
      </div>
    </BrowserRouter>
  );
};

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    auth: state.auth,
  };
};

export default connect(mapState)(Root);
