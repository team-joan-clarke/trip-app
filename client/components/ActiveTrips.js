import React, { useEffect } from "react";
import { getAllActiveTripsThunk } from "../redux/tripReducer";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
// ^ to link to a specific trip in trip dashboard

const ActiveTrips = (props) => {

  useEffect(() => {
    props.getTrips();
  }, []);

  const { trips } = props;

/*
trups.active = []
trips.active[0] = undefined
undefined.length 
*/

  return (
    <div>
      <h1>Current Trips</h1>
      <div>
        {trips.active.length == 0 ? (
          <h4>No active Trips</h4>
        ) : (
          trips.active.map((singleTrip) => {
            return (
              <Card
                className="mb-4"
                style={{ width: "18rem" }}
                key={singleTrip.id}
              >
                <Card.Img
                  variant="top"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPalFmzItiv41uwG0LGteZ-243tFftPPUb1xfU8MQNo-iEOpBBT_Kflw56iuun22IgT-M&usqp=CAU"
                />
                <Card.Body>
                  <Card.Title>{singleTrip.name}</Card.Title>
                  <Card.Text>Status: {singleTrip.status}</Card.Text>
                  <Button variant="success">View Trip</Button>
                </Card.Body>
              </Card>
            );
          })
        )}
      </div>
    </div>
  )
};

const mapStateToProps = (state) => {
  return {
    trips: state.trips,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTrips: () => {
      dispatch(getAllActiveTripsThunk());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ActiveTrips);
//   export default ActiveTrips
