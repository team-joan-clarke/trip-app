import React, { Component } from "react";
import { connect } from "react-redux";
import { Droppable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";

function startTimeCompare(a, b) {
  const aTime = new Date(a.start_date).getTime();
  const bTime = new Date(b.start_date).getTime();
  if (aTime) {
    if (bTime) {
      if (aTime >= bTime) {
        return 1;
      } else {
        return -1;
      }
    } else {
      return 1;
    }
  } else {
    if (bTime) {
      return 1;
    } else {
      return 0;
    }
  }
}

const TaskList = (props) => {
  if (props.tasks.length > 0) {
    props.tasks.sort(startTimeCompare);
    return (
      <div className="tasklist-container">
        {props.tasks.map((task, i) => {
          return <TaskCard key={i} type="itinerary" task={task} />;
        })}
      </div>
    );
  } else {
    return (
      <div style={{ alignSelf: "center" }}>
        <h6>No activities scheduled.</h6>
      </div>
    );
  }
};

export default connect(null)(TaskList);
