import React, { Component } from "react";
import { connect } from "react-redux";
import { Droppable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard";

const TaskList = (props) => {
  console.log("props", props.tasks);
  console.log("props LLL", props.tasks.length);
  if (props.tasks.length > 0) {
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
