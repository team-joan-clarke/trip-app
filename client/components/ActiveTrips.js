import React, { useEffect } from "react";
import { getAllActiveTripsThunk } from "../redux/tripReducer";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
// ^ to link to a specific trip in trip dashboard

const ActiveTrips = (props) => {
  const { userId } = useParams();

  useEffect(() => {
    props.getTrips(userId);
  }, []);

  const { trips } = props;
  console.log("in active trip component", trips.active);

  return (
    <div>
      <h1>Past Trips</h1>
      <div>
        {trips.active.length == 0 ? (
          <h2>No past trips</h2>
        ) : (
          trips.active[0].map((singleTrip) => {
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
  console.log("this is state in active trip", state.trips);
  return {
    trips: state.trips,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTrips: (userId) => {
      dispatch(getAllActiveTripsThunk(userId));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ActiveTrips);
//   export default ActiveTrips
