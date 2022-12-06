import axios from "axios";
import { unstable_renderSubtreeIntoContainer } from "react-dom";
import { getCookie } from "./users";

//action types
const GET_ALL_COMPLETED_TRIP = "GET_ALL_COMPLETED_TRIP";
const GET_ALL_ACTIVE_TRIP = "GET_ALL_ACTIVE_TRIPS";
const GET_SINGLE_TRIP = "GET_SINGLE_TRIP";
const CREATE_TRIP = "CREATE_TRIP";
const CREATE_USER_TRIP = "CREATE_USER_TRIP";
const UPDATE_USER_TRIP = "UPDATE_USER_TRIP";
const DELETE_USER_TRIP = "DELETE_USER_TRIP";
const DELETE_ACTIVE_TRIP = "DELETE_ACTIVE_TRIP";
const DELETE_COMPLETE_TRIP = "DELETE_COMPLETE_TRIP";
const UPDATE_TRIP = "UPDATE_TRIP";

//action creator
const getAllCompletedTrips = (trips) => {
  return {
    type: GET_ALL_COMPLETED_TRIP,
    trips,
  };
};

const getAllActiveTrips = (activeTrips) => {
  return {
    type: GET_ALL_ACTIVE_TRIP,
    activeTrips,
  };
};

const createTrip = (trip) => {
  return {
    type: CREATE_TRIP,
    trip,
  };
};

const createUserTrip = (userTrip) => {
  return {
    type: CREATE_USER_TRIP,
    userTrip,
  };
};

const updateUserTrip = (userTrip) => {
  return {
    type: UPDATE_USER_TRIP,
    userTrip,
  };
};

const deleteUserTrip = (userTrip) => {
  return {
    type: DELETE_USER_TRIP,
    userTrip,
  };
};

const deleteActiveTrip = (trip) => {
  return {
    type: DELETE_ACTIVE_TRIP,
    trip,
  };
};

const updateTrip = (trip) => {
  return {
    type: UPDATE_TRIP,
    trip,
  };
};

const deleteCompleteTrip = (trip) => {
  return {
    type: DELETE_COMPLETE_TRIP,
    trip,
  };
};

const getSingleTrip = (trip) => {
  return {
    type: GET_SINGLE_TRIP,
    trip,
  };
};

//thunk creator

export const getAllCompletedTripsThunk = () => {
  return async (dispatch) => {
    try {
      const id = getCookie("userId");
      const token = getCookie("token");
      const { data: trips } = await axios.get(
        `/api/trips/completedTrips/${id}`,
        {
          headers: { authorization: token },
        }
      );
      dispatch(getAllCompletedTrips(trips));
    } catch (error) {
      console.error(error);
    }
  };
};

export const getAllActiveTripsThunk = () => {
  return async (dispatch) => {
    try {
      const id = getCookie("userId");
      const token = getCookie("token");
      const { data: trips } = await axios.get(`/api/trips/activeTrips/${id}`, {
        headers: {
          authorization: token,
        },
      });
      dispatch(getAllActiveTrips(trips));
    } catch (error) {
      console.error(error);
    }
  };
};

export const createNewTrip = (trip) => {
  return async (dispatch) => {
    try {
      const token = getCookie("token");
      const { data } = await axios.post(`/api/trips`, trip, {
        headers: { authorization: token },
      });
      dispatch(createTrip(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const createNewUserTrip = (userTrip) => {
  // come back to add requireToken in backend
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`/api/userTrips`, userTrip);
      dispatch(createUserTrip(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateThisUserTrip = (tripId, userTrip) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/userTrips/${tripId}`, userTrip);
      dispatch(updateUserTrip(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteThisUserTrip = (tripId, userId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(`/api/userTrips/${tripId}/${userId}`);
      dispatch(deleteUserTrip(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const updateThisTrip = (updatedData, tripId) => {
  return async (dispatch) => {
    try {
      const token = getCookie("token");
      console.log("token in update", token);
      const { data } = await axios.put(
        `/api/trips/singleTrip/${tripId}`,
        updatedData,
        { headers: { authorization: token } }
      );
      dispatch(updateTrip(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteActiveTripThunk = (tripId) => {
  return async (dispatch) => {
    try {
      const token = getCookie("token");
      console.log("token in active thunk", token);
      const { data } = await axios.delete(`/api/trips/${tripId}`, {
        headers: { authorization: token },
      });
      dispatch(deleteActiveTrip(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteCompleteTripThunk = (tripId) => {
  return async (dispatch) => {
    const token = getCookie("token");
    try {
      const { data } = await axios.delete(`/api/trips/${tripId}`, {
        headers: { authorization: token },
      });
      dispatch(deleteCompleteTrip(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchSingleTrip = (tripId) => {
  return async (dispatch) => {
    try {
      const token = getCookie("token");
      const { data: trip } = await axios.get(
        `/api/trips/singleTrip/${tripId}`,
        { headers: { authorization: token } }
      );
      dispatch(getSingleTrip(trip));
    } catch (error) {
      console.error(error);
    }
  };
};

const initialState = { active: [], complete: [], singleTripView: {} };

// reducer
export default function tripReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_COMPLETED_TRIP:
      const sortedDatesForComplete = action.trips
        .map((obj) => {
          return { ...obj, start_date: new Date(obj.start_date) };
        })
        .map((obj) => {
          return { ...obj, end_date: new Date(obj.end_date) };
        })
        .sort(
          (objA, objB) => Number(objA.start_date) - Number(objB.start_date)
        );
      return { ...state, complete: sortedDatesForComplete };
    case GET_ALL_ACTIVE_TRIP:
      const sortedDates = action.activeTrips
        .map((obj) => {
          return { ...obj, start_date: new Date(obj.start_date) };
        })
        .map((obj) => {
          return { ...obj, end_date: new Date(obj.end_date) };
        })
        .sort(
          (objA, objB) => Number(objA.start_date) - Number(objB.start_date)
        );
      return { ...state, active: sortedDates };
    case CREATE_TRIP:
      const currentActiveTrips = state.active;
      return { ...state, active: [...currentActiveTrips, action.trip] };
    case CREATE_USER_TRIP:
      const activeTrips = state.active;
      return { ...state, active: [...activeTrips, action.userTrip] };
    case UPDATE_USER_TRIP:
      const currentSingleTripView = state.singleTripView
      const newUsersArray = state.singleTripView.Users.map((user) => {
        if (user.id === action.userTrip.UserId) {
          user.user_trip = action.userTrip
          return user
        } else {
          return user
        }
      })
      return {
        ...state,
        singleTripView: { ...currentSingleTripView, Users: newUsersArray },
      };
    case DELETE_USER_TRIP:
      const userTripsToKeep = state.singleTripView.Users.filter(
        (user) => user.id !== action.userTrip.UserId
      );
      return { ...state, singleTripView: { Users: [...userTripsToKeep] } };
    case DELETE_ACTIVE_TRIP:
      const filteredActiveTrips = state.active.filter((trip) => {
        return trip.id !== action.trip.id;
      });
      return {
        ...state,
        active: [...filteredActiveTrips],
      };
    case DELETE_COMPLETE_TRIP:
      const filteredCompletedTrips = state.complete.filter((trip) => {
        return trip.id !== action.trip.id;
      });
      return {
        ...state,
        complete: [...filteredCompletedTrips],
      };
    case UPDATE_TRIP:
      if (action.trip.status == "active") {
        const filteredTrips = state.active.filter(
          (trip) => trip.id !== action.trip.id
        );
        return { ...state, active: [...filteredTrips, action.trip] };
      } else {
        const filteredTrips = state.complete.filter(
          (trip) => trip.id !== action.trip.id
        );
        return { ...state, complete: [...filteredTrips, action.trip] };
      }

    case GET_SINGLE_TRIP:
      return { ...state, singleTripView: action.trip };
    default:
      return state;
  }
}

/*
initial
active: []

when there are no actives
active: []

when there are actives
active: [{ object 1}]



*/
