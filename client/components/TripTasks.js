import React, { Component } from "react";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./TaskComponents/Column";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";

const TripTasks = () => {
  const dispatch = useDispatch();
  const { tripId } = useParams();
  const tasks = useSelector((state) => state.tasks.allItineraryTasks);
  //const trip = useSelector((state) => state.trip.singleTrip);
  console.log(tasks);
  const [columns, setColumns] = useState([]);
  const [colTasks, setColTasks] = useState({});
  const testTrip = {
    id: 2,
    name: "Mardi Gras 2023!!!",
    city: "New Orleans",
    state: "Louisiana",
    country: "United States",
    start_date: "2023-03-15T04:00:00.000Z",
    end_date: "2023-03-24T03:59:59.000Z",
    status: "active",
    createdAt: "2022-11-29T21:46:20.261Z",
    updatedAt: "2022-11-29T21:46:20.261Z",
    Users: [
      {
        id: 6,
        firstName: "Jacob",
        lastName: "Valenzuela",
        username: "jacob",
        password:
          "$2b$05$HQT7pyZTpczrqpprYQJSuO6sH91EKeMX7Rd63C.WPJnugHwiJuOm.",
        token: null,
        email: "jacob@gmail.com",
        phoneNumber: "123-122-1234",
        createdAt: "2022-11-29T21:46:20.229Z",
        updatedAt: "2022-11-29T21:46:20.229Z",
        user_trip: {
          id: 15,
          role: "owner",
          createdAt: "2022-11-29T21:46:20.283Z",
          updatedAt: "2022-11-29T21:46:20.283Z",
          UserId: 6,
          TripId: 2,
        },
      },
      {
        id: 9,
        firstName: "Ashley",
        lastName: "Valenzuela",
        username: "ashley",
        password:
          "$2b$05$kuOGtAcnNFJkyaw1exphbOOjJUy/GfNOWnNkAxxUdHuAI5bmkGKIi",
        token: null,
        email: "ashley@gmail.com",
        phoneNumber: "123-121-1234",
        createdAt: "2022-11-29T21:46:20.229Z",
        updatedAt: "2022-11-29T21:46:20.229Z",
        user_trip: {
          id: 16,
          role: "attendee",
          createdAt: "2022-11-29T21:46:20.283Z",
          updatedAt: "2022-11-29T21:46:20.283Z",
          UserId: 9,
          TripId: 2,
        },
      },
      {
        id: 7,
        firstName: "Yuri",
        lastName: "Valenzuela",
        username: "yuri",
        password:
          "$2b$05$vjBpCZlzNFwxVYP8AHzQj.9rxfAIXKc3fDrUY8SQteNdqPXNG2k8q",
        token: null,
        email: "yuri@gmail.com",
        phoneNumber: "123-123-1234",
        createdAt: "2022-11-29T21:46:20.228Z",
        updatedAt: "2022-11-29T21:46:20.228Z",
        user_trip: {
          id: 17,
          role: "attendee",
          createdAt: "2022-11-29T21:46:20.283Z",
          updatedAt: "2022-11-29T21:46:20.283Z",
          UserId: 7,
          TripId: 2,
        },
      },
    ],
  };

  // useEffect(() => {}, [trip])

  // TRIP DURATION
  const diffTime = Math.abs(
    Date.parse(testTrip.end_date) - Date.parse(testTrip.start_date)
  );
  const tripDuration = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  useEffect(() => {
    // MAPPING TASKS TO COLUMNS BY DATE
    const dayArr = [];
    const taskMap = {};
    const startDay = new Date(testTrip.start_date);

    for (let i = 0; i < tripDuration; i++) {
      const startDate = new Date(testTrip.start_date);
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
        taskArr.push(task);
        taskMap[taskDate] = taskArr;
      }
    });
    setColumns(dayArr);
    setColTasks(taskMap);
  }, [tasks]);

  return (
    <Card style={{ width: "auto", flexDirection: "row", flexWrap: "wrap" }}>
      <DragDropContext>
        {columns.map((col, i) => {
          return <Column key={i} col={col} tasks={colTasks[col.date]} />;
        })}
      </DragDropContext>
    </Card>
  );
};
export default connect(null)(TripTasks);
