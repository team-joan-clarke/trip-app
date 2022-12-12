import React, { Component } from "react";
import { connect } from "react-redux";
import { useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import auth, { authenticateLogin } from "../redux/auth";
import { useNavigate } from "react-router-dom";

const credArr = ["ben pwben", "sara2 pwsara", "darian pwdarian"];

const About = (props) => {
  useEffect(() => {
    // if (props.auth.id) {
    //   navigate("/user");
    // }
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <main>
        <div
          style={{
            display: "flex",
            width: "auto",
            widthMax: "70%",
            flexDirection: "column",
            flexWrap: "wrap",
            padding: "2rem",
            borderRadius: "5px",
            boxShadow: "2px 1px 20px grey",
            margin: "3rem 6rem",
            alignItems: "center",
          }}
        >
          <h1 className="spicy-text">Level up your next group trip.</h1>
          <p>
            trippn is a comprehensive task management system designed to help
            you streamline your planning process.
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: "78%",
              // width: "auto",

              flexWrap: "wrap",
            }}
          >
            <div style={{ width: "auto" }}>
              <img
                src="/about/userdash.png"
                style={{
                  display: "flex",
                  width: "35rem",
                  boxShadow: "2px 1px 20px grey",
                  margin: "2rem",
                }}
              ></img>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "auto",
                // flexWrap: "wrap",
              }}
            >
              <h4>
                Go from &#128173; daydreams &#128173; to planning mode &#128395;{" "}
              </h4>
              <p>
                Create a new trip and invite travel companions. Keep track of
                your upcoming and past trips.
              </p>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: "78%",
            }}
          >
            <img
              src="/about/tasks.png"
              style={{
                width: "35rem",
                boxShadow: "2px 1px 20px grey",
                margin: "2rem",
              }}
            ></img>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h4>Delegate &#9193; with ease</h4>
              <p>Add, edit, and assign tasks to trip members.</p>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: "78%",
            }}
          >
            <img
              src="/about/tripdash.png"
              style={{
                width: "35rem",
                boxShadow: "2px 1px 20px grey",
                margin: "2rem",
              }}
            ></img>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h4>Stay in-the-know &#128467;</h4>
              <p>
                View a shared trip dashboard that centralizes trip information.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default connect(null)(About);
