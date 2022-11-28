import axios from "axios";

const ADD_NEW_TASK = "ADD_NEW_TASK";
const ADD_TASK_TO_USER = "ADD_TASK_TO_USER";

export const addedNewTask = (task) => ({
  type: ADD_NEW_TASK,
  task,
});

export const addedTaskToUser = (task) => ({
  type: ADD_TASK_TO_USER,
  task,
});

export const addNewTask = (task, userId, role) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/api/tasks", task);
      const userData = await axios.get(`/api/users/${userId}`);
      if (data && userData.data) {
        const user = userData.data;
        const task = data;
        const added = await user.addTask(task, { through: role });

        if (added) {
          dispatch(addedNewTask(task));
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
};

export const addTaskToUser = (userId, taskId, role) => {
  return async (dispatch) => {
    try {
      const userData = await axios.get(`/api/users/${userId}`);
      const taskData = await axios.get(`/api/tasks/${taskId}`);
      if (userData.data && taskData.data) {
        const user = userData.data;
        const task = taskData.data;
        const added = await user.addTask(task, { through: role });
        if (added) {
          dispatch(addedNewTask(task));
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
    case ADD_TASK_TO_USER:
      return {
        ...state,
        allItineraryTasks: [...state.allItineraryTasks, action.task],
      };
    default:
      return state;
  }
};

export default taskReducer;
