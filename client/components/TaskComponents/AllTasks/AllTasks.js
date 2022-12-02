import React from "react";
import { connect } from "react-redux";
import { Tab, Tabs } from "react-bootstrap";
import TasksCompleted from "./TasksCompleted";
import TasksInProgress from "./TasksInProgress";

// ^ to link to a specific trip in trip dashboard

const AllTasks = (props) => {
  return (
    <div className="tasklist-container">
      <h2> Tasks </h2>
      <Tabs
        defaultActiveKey="inProgress"
        id="uncontrolled-tab-example"
        animation="false"
      >
        <Tab eventKey="inProgress" title="In Progress">
          <TasksInProgress />
        </Tab>
        <Tab eventKey="completed" title="Completed" transition={false}>
          <TasksCompleted />
        </Tab>
      </Tabs>
    </div>
  );
};

// export default CompletedTrips
export default connect(null)(AllTasks);
