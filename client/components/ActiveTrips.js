import React, { useEffect, useState } from "react";
import {
  getAllActiveTripsThunk,
  deleteActiveTripThunk,
  fetchSingleTrip
} from "../redux/tripReducer";  
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

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
      <br></br>
      <h1>Your current trips</h1>
      <br></br>
      <div className="addFlex">
        {trips.active.length == 0 ? (
          <h5>No active Trips</h5>  
          ) : (
            trips.active.map((singleTrip) => {
              return (
                <div key={singleTrip.id}>  
                <Card
                  className="mb-4"
                  style={{ width: "18rem" }}
                  key={singleTrip.id}
                  >
                  <Card.Img variant="top" className="heightAndWidth" src={singleTrip.imageUrl} />
                  <Card.Body>
                    <Card.Title><strong>{singleTrip.name}</strong></Card.Title>
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
                    {singleTrip.role == "owner" ? 
                    <Button name={singleTrip.id} onClick={handleRemove} variant="outline-danger" className="marginLeft">
                      Delete
                    </Button> : <h1></h1>}
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
    },
    getTripAndUserRole: (tripId) => {
      dispatch(fetchSingleTrip(tripId))
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