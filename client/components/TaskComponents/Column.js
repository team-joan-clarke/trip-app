import React, { Component } from "react";
import { connect } from "react-redux";
import { Droppable } from "react-beautiful-dnd";
import Card from "react-bootstrap/Card";
import TaskList from "./TaskList";

const Column = (props) => {
  return (
    <Card
      style={{
        width: "15rem",
        alignItems: "center",
        margin: "2px",
        borderTop: "none",
      }}
    >
      <Card.Header
        className="text-center"
        style={{
          width: "15rem",
          alignItems: "center",
          margin: "2px",
          backgroundColor: "lightseagreen",
          color: "#F8F9FA",
          fontSize: "1.5rem",
          fontWeight: "600",
        }}
      >
        {props.col.date}
      </Card.Header>
      <TaskList tasks={props.ongoingTasks} trip={props.trip} type="ongoing" />
      <TaskList tasks={props.tasks} trip={props.trip} />
    </Card>
  );
};

export default connect(null)(Column);
