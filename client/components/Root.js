import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SingleUser from "./SingleUser";
import UpdateUserForm from "./UpdateUserForm";
import SingleTrip from "./SingleTrip";
import { Signup } from "./SignupForm";
import { Login } from "./LoginForm";
import NotFound from "./NotFound";
import NavigationBar from "./Navbar";
import CuteCarousel from "./Carousel";
import { useDispatch, useSelector } from "react-redux";
import { verified } from "../redux/auth";
import InviteEmailForm from "./InviteEmail";
import Demo from "./Demo";

const Root = ({ isLoggedIn }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verified());
  }, []);

  return (
    <BrowserRouter>
      <NavigationBar />
      <div>
        {isLoggedIn ? (
          <div>
            <Routes>
              <Route exact path="/user" element={<SingleUser />} />
              <Route exact path="/trip/:tripId" element={<SingleTrip />} />
              <Route exact path="/update" element={<UpdateUserForm />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route exact path="/home" element={<CuteCarousel />} />
              <Route exact path="/demo" element={<Demo />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/invite" element={<InviteEmailForm />} />
            </Routes>
          </div>
        ) : (
          <div>
            <div>
              <Routes>
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/signup" element={<Signup />} />
                <Route exact path="/home" element={<CuteCarousel />} />
                <Route exact path="/demo" element={<Demo />} />
                <Route path="*" element={<NotFound />} />
                <Route
                  exact
                  path="/"
                  element={<Navigate replace to="/home" />}
                />
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
