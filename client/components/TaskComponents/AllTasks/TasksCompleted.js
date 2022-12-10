import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import Card from "react-bootstrap/Card";
import { getTasksByUser } from "../../../redux/taskReducer";
import CompletedTaskCard from "./CompletedTaskCard";

//Sorting by Due Date of Task:
function dueDateCompare(a, b) {
  const aTime = new Date(a.due_date);
  const bTime = new Date(b.due_date);
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

const TasksCompleted = (props) => {
  const trips = props.trips.active;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTasksByUser());
  }, []);

  const activeTripsId = trips.map((trips) => trips.id);

  const tasks = props.tasks.allItineraryTasks || [];
  let completeTasks = tasks
    .filter((task) => {
      //ONLY RETRUNING TASKS FOR ACTIVE TRIPS
      if (task.status === "complete" && activeTripsId.includes(task.TripId)) {
        return task;
      }
    })
    .sort(dueDateCompare);

  return (
    <div>
      <br></br>
      <div>
        {completeTasks.length == 0 ? (
          <h4>No past tasks</h4>
        ) : (
          completeTasks.map((singleTask) => {
            return (
              <Card
                className="mb-4"
                style={{ width: "auto" }}
                key={singleTask.id}
              >
                <CompletedTaskCard singleTask={singleTask} trips={trips} />
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
    trips: state.trips,
  };
};

export default connect(mapStateToProps)(TasksCompleted);
