import React, { Component } from "react";
import { connect } from "react-redux";
import { Droppable } from "react-beautiful-dnd";
import Card from "react-bootstrap/Card";
import TaskList from "./TaskList";

const Column = (props) => {
  return (
    <Card style={{ width: "15rem", alignItems: "center", margin: "2px" }}>
      <h3>{props.col.date}</h3>
      <TaskList tasks={props.tasks} trip={props.trip} />
    </Card>
  );
};

export default connect(null)(Column);
