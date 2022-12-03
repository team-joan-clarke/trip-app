import React, { Component } from "react";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./TaskComponents/Column";

const TripTasks = (props) => {
  console.log("in trip tasks", props.trip.Users)
  const dispatch = useDispatch();
  const { tripId } = useParams();
  const tasks = useSelector((state) => state.tasks.allItineraryTasks);
  const [columns, setColumns] = useState([]);
  const [colTasks, setColTasks] = useState({});

  const { trip } = props;
  useEffect(() => {
    // MAPPING TASKS TO COLUMNS BY DATE
    if (trip) {
      const start = trip.start_date;
      const end = trip.end_date;

      // TRIP DURATION
      const diffTime = Math.abs(Date.parse(end) - Date.parse(start));
      const tripDuration = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      const dayArr = [];
      const taskMap = {};

      for (let i = 0; i < tripDuration; i++) {
        const startDate = new Date(start);
        startDate.setDate(startDate.getDate() + i);
        const dateStr = startDate.toDateString();
        dayArr.push({ date: dateStr });
        taskMap[dateStr] = [];
      }

      tasks.forEach((task) => {
        if (task.start_date) {
          const startDate = new Date(task.start_date);
          startDate.setDate(startDate.getDate());
          const taskDate = startDate.toDateString();
          const taskArr = taskMap[taskDate];
          if (taskArr) {
            taskArr.push(task);
            taskMap[taskDate] = taskArr;
          }
        }
      });
      setColumns(dayArr);
      setColTasks(taskMap);
    }
  }, [tasks, trip]);

  return (
    <div
      style={{
        width: "auto",
        flexDirection: "row",
        flexWrap: "wrap",
        padding: "2rem",
        borderRadius: "5px",
        boxShadow: "2px 1px 20px grey",
        marginTop: "3rem",
      }}
    >
      <h3>Trip Itinerary</h3>
      <div
        style={{
          display: "flex",
          width: "auto",
          flexDirection: "row",
          flexWrap: "wrap",
          padding: "none",
          justifyContent: "center",
        }}
      >
        <DragDropContext>
          {columns.map((col, i) => {
            return <Column key={i} col={col} tasks={colTasks[col.date]} />;
          })}
        </DragDropContext>
      </div>
    </div>
  );
};
export default connect(null)(TripTasks);
