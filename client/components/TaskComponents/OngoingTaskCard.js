import React, { Component, useEffect, useState, useRef } from "react";
import { connect, useDispatch } from "react-redux";
import Card from "react-bootstrap/Card";

const OngoingTaskCard = (props) => {
  return (
    <Card
      style={
        props.task.status === "in progress"
          ? {
              width: "13rem",
              marginTop: ".5rem",
              marginBottom: ".5rem",
              boxShadow: "0px 1px 1px #D7AF1D",
              backgroundColor: "#DFB51F",
              border: "none",
            }
          : {
              width: "13rem",
              marginTop: ".5rem",
              marginBottom: ".5rem",
              boxShadow: "0px 1px 1px #B6EB6F",
              backgroundColor: "#BDED7E",
              border: "none",
            }
      }
    >
      <Card.Header className="ongoing-task">
        {props.task.provider_name}
      </Card.Header>
    </Card>
  );
};

export default connect(null)(OngoingTaskCard);
