import React, { Component } from "react";
import { connect } from "react-redux";

function randomColor() {
  var hex = "#";
  for (var i = 0; i < 6; i++) {
    color += Math.floor(Math.random() * 50);
  }
  return color;
}

function Avatar(props) {
  const { firstName, lastName } = props;
  const color = randomColor();
  return (
    <div
      style={{
        height: "1.5rem",
        width: "1.5rem",
        borderRadius: "50%",
        backgroundColor: `${color}`,
      }}
    >
      <h6>
        {firstName[0]}
        {lastName[0]}
      </h6>
    </div>
  );
}

export default connect(null)(Avatar);
