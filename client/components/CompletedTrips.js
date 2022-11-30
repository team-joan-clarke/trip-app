import React, { useEffect } from "react";
import { getAllCompletedTripsThunk } from "../redux/tripReducer";
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "../../public/index.css";
// ^ to link to a specific trip in trip dashboard

const CompletedTrips = (props) => {
  useEffect(() => {
    props.getTrips();
  }, []);

  const { trips } = props;

  return (
    <div>
      <h1>Past Trips</h1>
      <div>
        {trips.complete.length == 0 ? (
          <h4>No past trips</h4>
        ) : (
          trips.complete.map((singleTrip) => {
            return (
              <div key={singleTrip.id}>
                <Card
                  className="mb-4"
                  style={{ width: "18rem" }}
                  key={singleTrip.id}
                >
                  <Card.Img variant="top" src={singleTrip.imageUrl} />
                  <Card.Body>
                    <Card.Title>{singleTrip.name}</Card.Title>
                    <Card.Text>Status: {singleTrip.status}</Card.Text>
                    <Card.Text>
                      Dates: {singleTrip.start_date.slice(5, 7)}/
                      {singleTrip.start_date.slice(8, 10)}/
                      {singleTrip.start_date.slice(0, 4)} -{" "}
                      {singleTrip.end_date.slice(5, 7)}/
                      {singleTrip.end_date.slice(8, 10)}/
                      {singleTrip.start_date.slice(0, 4)}
                    </Card.Text>
                    <Button variant="success">View Trip</Button>
                  </Card.Body>
                </Card>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};


const mapStateToProps = (state) => {
  return {
    trips: state.trips,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTrips: () => {
      dispatch(getAllCompletedTripsThunk());
    },
  };
};

// export default CompletedTrips
export default connect(mapStateToProps, mapDispatchToProps)(CompletedTrips);

// const months = {
//     01: "January",
//     02: "Febuary",
//     03: "March",
//     04: "April",
//     05: "May",
//     06: "June",
//     07: "July",
//     08: "August",
//     09: "September",
//     10: "October",
//     11: "November",
//     12: "December"
//   }
