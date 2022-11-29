import axios from "axios";

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

export const addNewTask = (task, userId, role) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/api/tasks", {
        ...task,
        userId,
        role,
      });
      if (data) {
        dispatch(addedNewTask(data));
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateTask = (updatedData, taskId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`/api/tasks/${taskId}`, updatedData);
      if (data) {
        dispatch(updatedTask(data));
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteTask = (taskId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`/api/tasks/${taskId}`);
      if (data) {
        dispatch(deletedTask(data));
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateTaskUser = (userId, taskId, role = null, action) => {
  return async (dispatch) => {
    try {
      if (action === "add") {
        // route to User_Task create
      } else if (action === "remove") {
        // route to User_Task delete
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
    case UPDATE_TASK:
      return {
        ...state,
        allItineraryTasks: [...state.allItineraryTasks, action.task],
      };
    case DELETE_TASK:
      return {
        ...state,
        allItineraryTasks: [...state.allItineraryTasks, action.task],
      };
    case UPDATE_TASK_USER:
      return {
        ...state,
        allItineraryTasks: [...state.allItineraryTasks, action.task],
      };
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