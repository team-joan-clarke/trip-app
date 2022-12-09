import React from "react";
import { connect } from "react-redux";
import { Tab, Tabs, Popover, OverlayTrigger } from "react-bootstrap";
import TasksCompleted from "./TasksCompleted";
import TasksInProgress from "./TasksInProgress";

const popover = (
  <Popover id="popover-basic">
    <Popover.Header as="h3">How to use this checklist</Popover.Header>
    <Popover.Body>
      <strong>Add New Tasks</strong> to keep track of information about trip
      activities. Add trip members to tasks as an editor with editing
      privileges, or attendee. <strong>Mark as Complete</strong> once the task
      has been finalized in order to view activity on itinerary.
    </Popover.Body>
  </Popover>
);

const AllTasks = (props) => {
  return (
    <div
      style={{
        width: "100%",
        flexDirection: "row",
        flexWrap: "wrap",
        padding: "2rem",
        borderRadius: "5px",
        boxShadow: "2px 1px 20px grey",
        margin: "5rem auto",
      }}
    >
      <div
        style={{
          display: "flex",
          flex: 5,
          flexDirection: "row",
          flexWrap: "nowrap",
          alignContent: "center",
        }}
      >
        <h1 className="spicy-text"> Todo </h1>
        <OverlayTrigger trigger="click" placement="right" overlay={popover}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-info-circle"
            viewBox="0 0 16 16"
            style={{ float: "left", margin: "10px" }}
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
          </svg>
        </OverlayTrigger>
      </div>
      <Tabs
        defaultActiveKey="Planning"
        id="uncontrolled-tab-example"
        animation="false"
      >
        <Tab eventKey="Planning" title="Planning">
          <TasksInProgress />
        </Tab>
        <Tab eventKey="Finalized" title="Finalized" transition={false}>
          <TasksCompleted />
        </Tab>
      </Tabs>
    </div>
  );
};

export default connect(null)(AllTasks);
