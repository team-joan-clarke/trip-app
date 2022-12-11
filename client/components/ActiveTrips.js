import React, { useEffect, useState } from "react";
import {
  getAllActiveTripsThunk,
  deleteActiveTripThunk,
  fetchSingleTrip,
} from "../redux/tripReducer";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Toast, ToastContainer } from "react-bootstrap";
import Slider from "react-slick";

const ActiveTrips = (props) => {
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
      <h1 className="spicy-text">Your current trips</h1>
      <h6>swipe to see your trips</h6>
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
          <Toast.Body>Successfully deleted trip</Toast.Body>
        </Toast>
      </ToastContainer>
      <div>
      <Slider {...settings}>
          {trips.active.length == 0 ? (
            <h5>No active Trips</h5>
          ) : (
            trips.active.map((singleTrip) => {
              return (
                <div key={singleTrip.id}>
                  <Card
                    className="mb-4"
                    style={{ width: "18rem", height: "30rem" }}
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
                        <Card.Text>Trip Role: {singleTrip.role}</Card.Text>
                      <Card.Text>
                        Dates: {singleTrip.start_date.toString().slice(3, 15)} -{" "}
                        {singleTrip.end_date.toString().slice(3, 15)}
                      </Card.Text>
                      <Card.Text></Card.Text>
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
              );
            })
          )}
           </Slider>
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
      dispatch(getAllActiveTripsThunk());
    },
    deleteTrip: (tripId) => {
      dispatch(deleteActiveTripThunk(tripId));
    },
    getTripAndUserRole: (tripId) => {
      dispatch(fetchSingleTrip(tripId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActiveTrips);


// const ActiveTrips = (props) => {
//   useEffect(() => {
//     props.getTrips();
//   }, []);

//   const { trips } = props;
//   const navigate = useNavigate();
//   const [showSuccessToast, setSuccessToast] = useState(false);

//   const handleClick = (event) => {
//     navigate(`/trip/${event.target.name}`);
//   };

//   const handleRemove = (event) => {
//     setSuccessToast(true);
//     props.deleteTrip(event.target.name);
//   };

//   const settings = {
//     dots: false,
//     infinite: false,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 3,
//   };

//   return (
//     <div>
//       <br></br>
//       <h1 className="spicy-text">Your current trips</h1>
//       <h6>swipe to see your trips</h6>
//       <br></br>
//       <ToastContainer position="top-end">
//         <Toast
//           bg="info"
//           onClose={() => setSuccessToast(false)}
//           show={showSuccessToast}
//           delay={3000}
//           autohide
//         >
//           <Toast.Header>
//             <img
//               src="holder.js/20x20?text=%20"
//               className="rounded me-2"
//               alt=""
//             />
//             <strong className="me-auto">trippn</strong>
//             <small>Now</small>
//           </Toast.Header>
//           <Toast.Body>Successfully deleted trip</Toast.Body>
//         </Toast>
//       </ToastContainer>
//       <div className="active">
//         <Slider {...settings}>
//           {trips.active.length == 0 ? (
//             <h5>No active Trips</h5>
//           ) : (
//             trips.active.map((singleTrip) => {
//               return (
//                 <div key={singleTrip.id}>
//                   <Card
//                     className="mb-4"
//                     style={{ width: "18rem", height: "30rem" }}
//                     key={singleTrip.id}
//                   >
//                     <Card.Img
//                       variant="top"
//                       className="heightAndWidth"
//                       src={singleTrip.imageUrl}
//                     />
//                     <Card.Body>
//                       <Card.Title>
//                         <strong>{singleTrip.name}</strong>
//                       </Card.Title>
//                       <Card.Text>Status: {singleTrip.status}</Card.Text>
//                       {singleTrip.role == "owner" ? (
//                         <Card.Text>Trip Role: {singleTrip.role}</Card.Text>
//                       ) : (
//                         <Card.Text>Trip Role: Owner</Card.Text>
//                       )}
//                       <Card.Text>
//                         Dates: {singleTrip.start_date.toString().slice(3, 15)} -{" "}
//                         {singleTrip.end_date.toString().slice(3, 15)}
//                       </Card.Text>
//                       <Card.Text></Card.Text>
//                       <Button
//                         name={singleTrip.id}
//                         onClick={handleClick}
//                         variant="primary"
//                       >
//                         View Trip
//                       </Button>
//                       {singleTrip.role == "owner" ? (
//                         <Button
//                           name={singleTrip.id}
//                           onClick={handleRemove}
//                           variant="outline-danger"
//                           className="marginLeft"
//                         >
//                           Delete
//                         </Button>
//                       ) : (
//                         <h1></h1>
//                       )}
//                     </Card.Body>
//                   </Card>
//                 </div>
//               );
//             })
//           )}
//         </Slider>
//       </div>
//     </div>
//   );
// };