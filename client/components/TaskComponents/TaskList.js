import React, { Component } from "react";
import { connect } from "react-redux";
import { Droppable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";

function startTimeCompare(a, b) {
  if (a.start_time) {
    if (b.start_time) {
      if (a.start_time >= b.start_time) {
        return 1;
      } else {
        return -1;
      }
    } else {
      return 1;
    }
  } else {
    if (b.start_time) {
      return 1;
    } else {
      return 0;
    }
  }
}

const TaskList = (props) => {
  console.log("props", props.tasks);
  console.log("props LLL", props.tasks.length);
  if (props.tasks.length > 0) {
    console.log("before", props.tasks);
    props.tasks.sort(startTimeCompare);
    console.log("after", props.tasks);
    return (
      <div className="tasklist-container">
        {props.tasks.map((task, i) => {
          console.log("t", task);
          return <TaskCard key={i} task={task} />;
        })}
      </div>
    );
  }
};

export default connect(null)(TaskList);
