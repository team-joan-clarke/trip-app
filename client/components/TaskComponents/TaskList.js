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
  if (props.tasks.length > 0) {
    props.tasks.sort(startTimeCompare);
    return (
      <div className="tasklist-container">
        {props.tasks.map((task, i) => {
          return <TaskCard key={i} type="itinerary" task={task} />;
        })}
      </div>
    );
  }
};

export default connect(null)(TaskList);
