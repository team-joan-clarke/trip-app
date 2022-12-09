import React from "react";
import { connect } from "react-redux";
import { Tab, Tabs } from "react-bootstrap";
import TasksCompleted from "./TasksCompleted";
import TasksInProgress from "./TasksInProgress";

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
      <h1 className="spicy-text"> Todo </h1>
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
