import axios from "axios";

//action types
const GET_ALL_TRIPS = "GET_ALL_TRIPS";

//action creator

const getAllTrips = (trips) => {
  return {
    type: GET_ALL_TRIPS,
    trips,
  };
};

//thunk creator

const getAllTripsThunk = () => {
  return async (dispatch) => {
    try {
      const { data: trips } = await axios.get(
        `/api/trips/allUserTrips/${userId}`
      );
      dispatch(trips);
    } catch (error) {
      console.error(error);
    }
  };
};

const initialState = [];

// reducer
export default function tripReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_TRIPS:
      return action.trips;
    default:
      return state;
  }
}
