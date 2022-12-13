import React, { useState, useEffect } from "react";
import {
  getAllCompletedTripsThunk,
  deleteCompleteTripThunk,
} from "../redux/tripReducer";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Toast, ToastContainer } from "react-bootstrap";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const CompletedTrips = (props) => {
  useEffect(() => {
    props.getTrips();
  }, []);

  const { trips } = props;
  const navigate = useNavigate();
  const [showSuccessToast, setSuccessToast] = useState(false);

  const handleClick = (event) => {
    navigate(`/trip/${event.target.name}`);
  };

  const handleRemove = (event) => {
    setSuccessToast(true);
    props.deleteTrip(event.target.name);
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };

  return (
    <div>
      <br></br>
      <h1 className="spicy-text">Your past trips</h1>
      <br></br>
      <ToastContainer position="top-end">
        <Toast
          bg="info"
          onClose={() => setSuccessToast(false)}
          show={showSuccessToast}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">trippn</strong>
            <small>Now</small>
          </Toast.Header>
          <Toast.Body>Succesfully deleted trip!</Toast.Body>
        </Toast>
      </ToastContainer>

      <div>
        <Splide
          aria-label="Your current trips"
          options={{
            perPage: 3,
          }}
        >
          {trips.complete.length == 0 ? (
            <h5>No past trips</h5>
          ) : (
            trips.complete.map((singleTrip) => {
              return (
                <SplideSlide className="marginBetween">
                  <div key={singleTrip.id}>
                    <Card
                      className="mb-4"
                      style={{ width: "18rem" }}
                      key={singleTrip.id}
                    >
                      <Card.Img
                        variant="top"
                        className="heightAndWidth"
                        src={singleTrip.imageUrl}
                      />
                      <Card.Body>
                        <Card.Title>
                          <strong>{singleTrip.name}</strong>
                        </Card.Title>
                        <Card.Text>Status: {singleTrip.status}</Card.Text>
                        <Card.Text>Trip role: {singleTrip.role}</Card.Text>
                        <Card.Text>
                          Dates: {singleTrip.start_date.toString().slice(3, 15)}{" "}
                          - {singleTrip.end_date.toString().slice(3, 15)}
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
                            className="marginLeft"
                          >
                            Delete
                          </Button>
                        ) : (
                          <h1></h1>
                        )}
                      </Card.Body>
                    </Card>
                  </div>
                </SplideSlide>
              );
            })
          )}
        </Splide>
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
