import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Draggable } from "react-beautiful-dnd";

function timeDisplayConverter(time) {
  const formattedTime = new Date(time).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return formattedTime;
}

const TaskCard = (props) => {
  console.log("in task card");
  const [seeMore, setSeeMore] = useState(false);

  // let more;

  // useEffect(() => {
  //   more = seeMore;
  // }, [setSeeMore]);

  return (
    <Card style={{ width: "13rem", marginTop: "1rem" }}>
      <Card.Body>
        <Card.Title>{props.task.provider_name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {props.task.type}: {props.task.subtype ? props.task.subtype : ""}
        </Card.Subtitle>
        <Card.Text>Start: {props.task.start_time}</Card.Text>
        {props.task.checkin_time ? (
          <Card.Text>Check In: {props.task.checkin_time}</Card.Text>
        ) : (
          <></>
        )}
        {props.task.description && seeMore ? (
          <Card.Text>Description: {props.task.description}</Card.Text>
        ) : (
          <></>
        )}
        {props.task.link ? (
          <Card.Link href={props.task.link} target="_blank">
            Visit Website
          </Card.Link>
        ) : (
          <></>
        )}
        <Button variant="primary" style={{ float: "right" }}>
          Edit
        </Button>
        <Card.Link
          className="mb-2 text-muted"
          href=""
          onClick={(e) => {
            e.preventDefault();
            setSeeMore(!seeMore);
          }}
        >
          {seeMore ? "See Less" : "See More..."}
        </Card.Link>
      </Card.Body>
    </Card>
  );
};

export default connect(null)(TaskCard);
