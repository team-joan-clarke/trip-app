import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SingleUser from "./SingleUser";
import { Signup } from "./SignupForm";
import { Login } from "./LoginForm";
import Navbar from "./Navbar";

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
    <Navbar />
      <Routes>
        <Route exact path="/users/:userId" element={<SingleUser />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default connect(null)(Root);
