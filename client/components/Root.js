import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SingleUser from "./SingleUser";
import UpdateUserForm from "./UpdateUserForm";
import SingleTrip from "./SingleTrip";
import { Signup } from "./SignupForm";
import { Login } from "./LoginForm";
import NavigationBar from "./Navbar";

// const Root = () => {
//   let [stuff, setStuff] = useState("root");
//   useEffect(() => {
//     async function getStuff() {
//       const someStuff = await axios.get("/api/route1");
//       setStuff(someStuff.data);
//     }
//     getStuff();
//   }, []);

//   return <h1>Some State Stuff: {JSON.stringify(stuff)}</h1>;
// };

const Root = () => {
  return (
    <BrowserRouter>
    <NavigationBar />
      <Routes>
        <Route exact path="/user" element={<SingleUser />} />
        <Route exact path="/trip/:tripId" element={<SingleTrip />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/update" element={<UpdateUserForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default connect(null)(Root);
