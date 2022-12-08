import axios from "axios";
import { getCookie } from "./users";

const ADD_NEW_TASK = "ADD_NEW_TASK";
const UPDATE_TASK = "UPDATE_TASK";
const DELETE_TASK = "DELETE_TASK";
const UPDATE_TASK_USER = "UPDATE_TASK_USER";
const GET_TASKS = "GET_TASKS";

export const addedNewTask = (task) => ({
  type: ADD_NEW_TASK,
  task,
});

export const updatedTask = (task) => ({
  type: UPDATE_TASK,
  task,
});

export const deletedTask = (task) => ({
  type: DELETE_TASK,
  task,
});

export const updatedTaskUser = (task) => ({
  type: UPDATE_TASK_USER,
  task,
});

export const gotTasks = (tasks) => ({
  type: GET_TASKS,
  tasks,
});

export const getTasksByUser = () => {
  return async (dispatch) => {
    try {
      const id = getCookie("userId");
      const token = getCookie("token");
      const { data } = await axios.get(`api/tasks/user/${id}`, {
        headers: { authorization: token },
      });
      dispatch(gotTasks(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const getTasksByTrip = (tripId) => {
  return async (dispatch) => {
    try {
      const token = getCookie("token");
      const { data } = await axios.get(`/api/tasks/trip/${tripId}`, {
        headers: { authorization: token },
      });
      if (data) {
        dispatch(gotTasks(data));
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const addNewTask = (task, role) => {
  return async (dispatch) => {
    try {
      const userId = getCookie("userId");
      const token = getCookie("token");
      const { data } = await axios.post(
        `/api/tasks/${task.TripId}`,
        {
          ...task,
          userId,
          role,
        },
        { headers: { authorization: token } }
      );
      if (data) {
        dispatch(addedNewTask(data));
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateTask = (updatedData, taskId) => {
  const { TripId } = updatedData;
  return async (dispatch) => {
    try {
      const token = getCookie("token");
      const { data } = await axios.put(
        `/api/tasks/${taskId}/${TripId}`,
        updatedData,
        {
          headers: { authorization: token },
        }
      );
      if (data) {
        dispatch(updatedTask(data));
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteTask = (taskId, tripId) => {
  return async (dispatch) => {
    try {
      const token = getCookie("token");
      const { data } = await axios.delete(`/api/tasks/${taskId}/${tripId}`, {
        headers: { authorization: token },
      });
      if (data) {
        dispatch(deletedTask(data));
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateTaskUser = (userId, taskId, role = null, action, tripId) => {
  return async (dispatch) => {
    try {
      const token = getCookie("token");
      if (action === "add") {
        // route to User_Task create
        const { data } = await axios.post(
          `/api/tasks/task-user/${tripId}`,
          {
            userId,
            taskId,
            role,
          },
          { headers: { authorization: token } }
        );
        if (data) {
          dispatch(updatedTaskUser(data));
        }
      } else if (action === "remove") {
        // route to User_Task delete
        const { data } = await axios.delete(
          `/api/tasks/task-user/${userId}/${taskId}/${tripId}`,
          {
            headers: { authorization: token },
          }
        );
        if (data) {
          dispatch(updatedTaskUser(data));
        }
      } else if (action === "updateRole") {
        const { data } = await axios.put(
          `/api/tasks/task-user/${tripId}`,
          {
            userId,
            taskId,
            role,
          },
          { headers: { authorization: token } }
        );
        if (data) {
          dispatch(updatedTaskUser(data));
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
};

const initialState = { allItineraryTasks: [], singleTaskView: {} };
const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_TASK:
      return {
        ...state,
        allItineraryTasks: [...state.allItineraryTasks, action.task],
      };
    case UPDATE_TASK: {
      const updatedTaskArr = state.allItineraryTasks.map((task) =>
        task.id === action.task.id ? action.task : task
      );
      return {
        ...state,
        allItineraryTasks: [...updatedTaskArr],
      };
    }
    case DELETE_TASK: {
      const filteredTasks = state.allItineraryTasks.filter(
        (task) => task.id !== action.task.id
      );
      return {
        ...state,
        allItineraryTasks: [...filteredTasks],
      };
    }
    case UPDATE_TASK_USER: {
      const filteredTasks = state.allItineraryTasks.filter(
        (task) => task.id !== action.task.id
      );
      return {
        ...state,
        allItineraryTasks: [...filteredTasks, action.task],
      };
    }
    case GET_TASKS:
      return {
        ...state,
        allItineraryTasks: action.tasks,
      };
    default:
      return state;
  }
};

export default taskReducer;

// trip owner or trip editor can edit tasks
// can edit bcs task editor or i am task owner
