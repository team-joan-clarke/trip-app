import React, { useEffect } from "react";
import {
  getAllCompletedTripsThunk,
  deleteCompleteTripThunk,
} from "../redux/tripReducer";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "../../public/index.css";

const CompletedTrips = (props) => {
  useEffect(() => {
    props.getTrips();
  }, []);

  const { trips } = props;
  const navigate = useNavigate();

  console.log("props in completed trips", trips);

  const handleClick = (event) => {
    navigate(`/trip/${event.target.name}`);
  };

  const handleRemove = (event) => {
    props.deleteTrip(event.target.name);
  };

  return (
    <div>
      <h1>Past Trips</h1>
      <div>
        {trips.complete.length == 0 ? (
          <h5>No past trips</h5>
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
                    <Card.Text>Trip Role: {singleTrip.role}</Card.Text>
                    <Card.Text>
                      Dates: {singleTrip.start_date.toString().slice(3, 15)} -{" "}
                      {singleTrip.end_date.toString().slice(3, 15)}
                    </Card.Text>
                    <Button
                      name={singleTrip.id}
                      onClick={handleClick}
                      variant="primary"
                    >
                      View Trip
                    </Button>
                    {singleTrip.role == "owner" ? (
                      <Button
                        name={singleTrip.id}
                        onClick={handleRemove}
                        variant="outline-danger"
                      >
                        Delete
                      </Button>
                    ) : (
                      <h1></h1>
                    )}
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
    deleteTrip: (tripId) => {
      dispatch(deleteCompleteTripThunk(tripId));
    },
  };
};

// export default CompletedTrips
export default connect(mapStateToProps, mapDispatchToProps)(CompletedTrips);
