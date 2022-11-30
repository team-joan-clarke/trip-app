import React, { Component } from "react";
import { connect } from "react-redux";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Draggable } from "react-beautiful-dnd";

const TaskCard = (props) => {
  console.log("in task card");
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{props.task.provider_name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {props.task.type}: {props.task.subtype ? props.task.subtype : ""}
        </Card.Subtitle>
        <Card.Text>Start: {props.task.start_time}</Card.Text>
        <Card.Text>Check In: {props.task.checkin_time}</Card.Text>
        <Card.Text>Description: {props.task.description}</Card.Text>
        <Card.Link href={props.task.description}>Visit Website</Card.Link>
        <Button variant="primary" style={{ float: "right" }}>
          Edit
        </Button>
      </Card.Body>
    </Card>
  );
};

export default connect(null)(TaskCard);
