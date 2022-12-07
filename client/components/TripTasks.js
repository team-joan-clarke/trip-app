import React, { Component } from "react";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./TaskComponents/Column";
import TaskList from "./TaskComponents/TaskList";

const TripTasks = (props) => {
  const dispatch = useDispatch();
  const { tripId } = useParams();
  const tasks = useSelector((state) => state.tasks.allItineraryTasks);
  const [columns, setColumns] = useState([]);
  const [colTasks, setColTasks] = useState({});
  const [colOngoingTasks, setColOngoingTasks] = useState({});

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
      const taskOngoingMap = {};
      const taskOngoingMapDate = {};

      // MAKE ARR OF TRIP DAYS
      for (let i = 0; i < tripDuration; i++) {
        const startDate = new Date(start);
        startDate.setDate(startDate.getDate() + i);
        const dateStr = startDate.toDateString();
        dayArr.push({ date: dateStr });
        taskMap[dateStr] = [];
        taskOngoingMapDate[startDate] = [];
        taskOngoingMap[dateStr] = [];
      }
      // ASSIGN TASKS TO DAYS
      tasks.forEach((task) => {
        // ASSIGN TASK TO START DATE
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
        if (
          task.end_date &&
          new Date(task.end_date).getDate() >
            new Date(task.start_date).getDate()
        ) {
          // ASSIGN TASK ONGOING DURATION
          const endDate = new Date(task.end_date);
          endDate.setDate(endDate.getDate());
          const taskEndDate = endDate.toDateString();
          const taskEndArr = taskMap[taskEndDate];
          if (taskEndArr) {
            for (const date in taskOngoingMapDate) {
              if (
                new Date(date).getDate() >=
                  new Date(task.start_date).getDate() &&
                new Date(date).getDate() <= new Date(task.end_date).getDate()
              ) {
                const mapDate = new Date(date);
                mapDate.setDate(mapDate.getDate(date));
                const taskOngoingArr = taskOngoingMapDate[date];
                taskOngoingArr.push(task);
                taskOngoingMap[mapDate.toDateString()] = taskOngoingArr;
              }
            }
          }
        }
      });
      setColumns(dayArr);
      setColTasks(taskMap);
      setColOngoingTasks(taskOngoingMap);
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
            return (
              <Column
                key={i}
                col={col}
                tasks={colTasks[col.date]}
                ongoingTasks={colOngoingTasks[col.date]}
                trip={props.trip}
              />
            );
          })}
        </DragDropContext>
      </div>
    </div>
  );
};
export default connect(null)(TripTasks);
