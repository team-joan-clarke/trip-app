import React, { Component } from "react";
import { connect } from "react-redux";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../redux/users";
import CompletedTrips from "./CompletedTrips";
import ActiveTrips from "./ActiveTrips";

const SingleUser = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  const user = useSelector((state) => state.users);
  const firstName = user.firstName || "";

  return (
    <div className="container">
      <main>
        {user.length == 0 && (
          <h3 className=" error"> User does not exist in the system!</h3>
        )}
        <h2> Hello {firstName}</h2>
        <h3>Here are your upcoming trips: </h3>
        <CompletedTrips />
        <h3>Here are your past trips: </h3>
        <ActiveTrips />
        <h3>Here are your tasks: </h3>
        <h3>RENDER TESTING</h3>
      </main>
    </div>
  );
};

const mapState = (state) => {
  return {
    user: state.users,
  };
};

export default connect(mapState)(SingleUser);
