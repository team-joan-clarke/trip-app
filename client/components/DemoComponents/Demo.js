import React, { Component } from "react";
import { connect } from "react-redux";
import { useEffect } from "react";
import { Card, Button } from "react-bootstrap";

const Demo = (props) => {
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
            margin: "8rem",
            alignItems: "center",
          }}
        >
          <h1>Start trippn today.</h1>
          <h2>Not ready for takeoff quite yet?</h2>
          <h3>
            Explore the trippn trip task management system by demoing the
            experiences below.
          </h3>
          <div
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              borderBottom: "2px solid #D3D3D3",
              marginBottom: "3rem",
            }}
          >
            <Button size="lg" style={{ margin: "2rem", width: "10rem" }}>
              Sara
            </Button>
            <Button size="lg" style={{ margin: "2rem", width: "10rem" }}>
              Darian
            </Button>
            <Button size="lg" style={{ margin: "2rem", width: "10rem" }}>
              Ben
            </Button>
          </div>

          <h3>Here's how we help:</h3>
          <ul>
            <li>Create a new trip and invite travel companions</li>
            <li>Add, edit, and assign tasks to trip members</li>
            <li>View a shared trip dashboard to centralize trip information</li>
            <li>View multiple upcoming and past trips</li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default connect(null)(Demo);
