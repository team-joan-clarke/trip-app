import React, { useEffect } from "react";
import { getAllCompletedTripsThunk } from "../redux/tripReducer";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button"
// ^ to link to a specific trip in trip dashboard

const CompletedTrips = (props) => {
  console.log("these are props", props);

  useEffect(() => {
    props.getTrips(4);
  }, []);

  const { trips } = props;

  return (
    <div>
      <h1>Hello these are completed Trips</h1>
      <div>
        {trips.map((singleTrip) => {
          console.log("one trip", singleTrip);
          return (
            <Card style={{ width: "18rem" }} key={singleTrip.id}>
              <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPalFmzItiv41uwG0LGteZ-243tFftPPUb1xfU8MQNo-iEOpBBT_Kflw56iuun22IgT-M&usqp=CAU" />
              <Card.Body>
                <Card.Title>{singleTrip.name}</Card.Title>
                <Card.Text>{singleTrip.description}</Card.Text>
                <Button variant="success">View Trip</Button>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log("this is state", state.trips);
  return {
    trips: state.trips,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTrips: (userId) => {
      dispatch(getAllCompletedTripsThunk(userId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompletedTrips);
