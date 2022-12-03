import React, { useEffect, useState } from "react";
import {
  getAllActiveTripsThunk,
  deleteActiveTripThunk,
} from "../redux/tripReducer";  
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

// import Card from 'react-bootstrap/Card';
// import Col from 'react-bootstrap/Col';
// import Row from 'react-bootstrap/Row';


// function ActiveTrips(props) {
//   useEffect(() => {
//     props.getTrips();
//   }, []);

//   const { trips } = props;
//   const navigate = useNavigate();

//   const handleClick = (event) => {
//     navigate(`/trip/${event.target.name}`);
//   };

//   const handleRemove = (event) => {
//     props.deleteTrip(event.target.name);
//   };

//   return (
//     <Row xs={1} md={2} className="g-4">
//       {Array.from({ length: 4 }).map((_, idx) => (
//         <Col>
//           <Card>
//             <Card.Img variant="top" src="holder.js/100px160" />
//             <Card.Body>
//               <Card.Title>Card title</Card.Title>
//               <Button variant="primary" onClick={handleClick}> View Trip</Button>
//               <Button variant="primary" onClick={handleRemove}>Remove</Button>
//             </Card.Body>
//           </Card>
//         </Col>
//       ))}
//     </Row>
//   );
// }



const ActiveTrips = (props) => {
  useEffect(() => {
    props.getTrips();  
  }, []);
  
  const { trips } = props;
  const navigate = useNavigate();
  
  const handleClick = (event) => {
    navigate(`/trip/${event.target.name}`);  
  };
  
  const handleRemove = (event) => {
    props.deleteTrip(event.target.name);  
  };
  return (
    <div>  
      <h1>Current Trips</h1>
      <div>
        {trips.active.length == 0 ? (
          <h4>No active Trips</h4>  
          ) : (
            trips.active.map((singleTrip) => {
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
                    <Button name={singleTrip.id} onClick={handleRemove} variant="primary">
                      Remove
                    </Button>
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
      dispatch(getAllActiveTripsThunk());
    },  
    deleteTrip: (tripId) => {
      dispatch(deleteActiveTripThunk(tripId));
    }  
  };  
};  

export default connect(mapStateToProps, mapDispatchToProps)(ActiveTrips);




// import React, { useEffect, useState } from "react";
// import {
//   getAllActiveTripsThunk,
//   deleteActiveTripThunk,
// } from "../redux/tripReducer";
// import { connect } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import Card from "react-bootstrap/Card";
// import Button from "react-bootstrap/Button";

// const ActiveTrips = (props) => {
//   useEffect(() => {
//     props.getTrips();
//   }, []);

//   const { trips } = props;
//   const navigate = useNavigate();

//   const handleClick = (event) => {
//     navigate(`/trip/${event.target.name}`);
//   };

//   const handleRemove = (event) => {
//     props.deleteTrip(event.target.name);
//   };
//   return (
//     <div>
//       <h1>Current Trips</h1>
//       <div>
//         {trips.active.length == 0 ? (
//           <h4>No active Trips</h4>
//         ) : (
//           trips.active.map((singleTrip) => {
//             return (
//               <div key={singleTrip.id}>
//                 <Card
//                   className="mb-4"
//                   style={{ width: "18rem" }}
//                   key={singleTrip.id}
//                 >
//                   <Card.Img variant="top" src={singleTrip.imageUrl} />
//                   <Card.Body>
//                     <Card.Title>{singleTrip.name}</Card.Title>
//                     <Card.Text>Status: {singleTrip.status}</Card.Text>
//                     <Card.Text>
//                       Dates: {singleTrip.start_date.toString().slice(3, 15)} -{" "}
//                       {singleTrip.end_date.toString().slice(3, 15)}
//                     </Card.Text>
//                     <Card.Text></Card.Text>
//                     <Button
//                       name={singleTrip.id}
//                       onClick={handleClick}
//                       variant="primary"
//                     >
//                       View Trip
//                     </Button>
//                     <Button name={singleTrip.id} onClick={handleRemove} variant="primary">
//                       Remove
//                     </Button>
//                   </Card.Body>
//                 </Card>
//               </div>
//             );
//           })
//         )}
//       </div>
//     </div>
//   );
// };

// const mapStateToProps = (state) => {
//   return {
//     trips: state.trips,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     getTrips: () => {
//       dispatch(getAllActiveTripsThunk());
//     },
//     deleteTrip: (tripId) => {
//       dispatch(deleteActiveTripThunk(tripId));
//     }
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(ActiveTrips);