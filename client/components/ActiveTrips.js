import React, { useEffect, useState, Component} from "react";
import {
  getAllActiveTripsThunk,
  deleteActiveTripThunk,
  fetchSingleTrip,
} from "../redux/tripReducer";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Slider from "react-slick";

// function SampleNextArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       style={{ ...style, display: "block", background: "red" }}
//       onClick={onClick}
//     />
//   );
// }

// function SamplePrevArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       style={{ ...style, display: "block", background: "green" }}
//       onClick={onClick}
//     />
//   );
// }

// class ActiveTrips extends Component {
//   constructor(props) {
//     super();
//     this.handleClick = this.handleClick.bind(this);
//     this.handleRemove = this.handleRemove.bind(this);
//   }
//   componentDidMount() {
//     this.props.getTrips();
//   }

//   handleClick(event) {
//     const navigate = useNavigate();
//     navigate(`/trip/${event.target.name}`);
//   }

//   handleRemove = (event) => {
//     props.deleteTrip(event.target.name);
//   };

//   render() {
//     const { trips } = this.props;
//     const settings = {
//       dots: true,
//       infinite: true,
//       slidesToShow: 3,
//       slidesToScroll: 1,
//       nextArrow: <SampleNextArrow />,
//       prevArrow: <SamplePrevArrow />,
//     };
//     return (
//       <div>
//         <h2 className="spicy-text">Your Current Trips</h2>
//         <br></br>
//         <div className="addFlex">
//           {trips.active.length == 0 ? (<h5>No active trips</h5>) : (
//           <Slider {...settings}>
//             {trips.active.map((singleTrip) => {
//               return (
//                 <div key={singleTrip.id}>
//                    <Card
//                   className="mb-4"
//                   style={{ width: "18rem" }}
//                   key={singleTrip.id}
//                 >
//                   <Card.Img
//                     variant="top"
//                     className="heightAndWidth"
//                     src={singleTrip.imageUrl}
//                   />
//                   <Card.Body>
//                     <Card.Title>
//                       <strong>{singleTrip.name}</strong>
//                     </Card.Title>
//                     <Card.Text>Status: {singleTrip.status}</Card.Text>
//                     <Card.Text>Trip Role: {singleTrip.role}</Card.Text>
//                     <Card.Text>
//                       Dates: {singleTrip.start_date.toString().slice(3, 15)} -{" "}
//                       {singleTrip.end_date.toString().slice(3, 15)}
//                     </Card.Text>
//                     <Card.Text></Card.Text>
//                     <Button
//                       name={singleTrip.id}
//                       onClick={this.handleClick}
//                       variant="primary"
//                     >
//                       View Trip
//                     </Button>
//                     {singleTrip.role == "owner" ? (
//                       <Button
//                         name={singleTrip.id}
//                         onClick={this.handleRemove}
//                         variant="outline-danger"
//                         className="marginLeft"
//                       >
//                         Delete
//                       </Button>
//                     ) : (
//                       <h1></h1>
//                     )}
//                   </Card.Body>
//                 </Card>

//                 </div>
//               )
//             })}
//           </Slider>
//           )}
//         </div>
//       </div>
//     );
//   }
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
      <br></br>
      <h1 className="spicy-text">Your current trips</h1>
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

// function SampleNextArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       style={{ ...style, display: "block", background: "red" }}
//       onClick={onClick}
//     />
//   );
// }

// function SamplePrevArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       style={{ ...style, display: "block", background: "green" }}
//       onClick={onClick}
//     />
//   );
// }

// export default class CustomArrows extends Component {
//   render() {
//     const settings = {
//       dots: true,
//       infinite: true,
//       slidesToShow: 3,
//       slidesToScroll: 1,
//       nextArrow: <SampleNextArrow />,
//       prevArrow: <SamplePrevArrow />
//     };
//     return (
//       <div>
//         <h2>Custom Arrows</h2>
//         <Slider {...settings}>
//           <div>
//             <h3>1</h3>
//           </div>
//           <div>
//             <h3>2</h3>
//           </div>
//           <div>
//             <h3>3</h3>
//           </div>
//           <div>
//             <h3>4</h3>
//           </div>
//           <div>
//             <h3>5</h3>
//           </div>
//           <div>
//             <h3>6</h3>
//           </div>
//         </Slider>
//       </div>
//     );
//   }
// }

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
//       <br></br>
//       <h1 className='spicy-text'>Your current trips</h1>
//       <br></br>
//       <div className="addFlex">
//         {trips.active.length == 0 ? (
//           <h5>No active Trips</h5>
//           ) : (
//             trips.active.map((singleTrip) => {
//               return (
//                 <div key={singleTrip.id}>
//                 <Card
//                   className="mb-4"
//                   style={{ width: "18rem" }}
//                   key={singleTrip.id}
//                   >
//                   <Card.Img variant="top" className="heightAndWidth" src={singleTrip.imageUrl} />
//                   <Card.Body>
//                     <Card.Title><strong>{singleTrip.name}</strong></Card.Title>
//                     <Card.Text>Status: {singleTrip.status}</Card.Text>
//                     <Card.Text>Trip Role: {singleTrip.role}</Card.Text>
//                     <Card.Text>
//                       Dates: {singleTrip.start_date.toString().slice(3, 15)} -{" "}
//                       {singleTrip.end_date.toString().slice(3, 15)}
//                     </Card.Text>
//                     <Card.Text></Card.Text>
//                     <Button
//                       name={singleTrip.id}
//                       onClick={handleClick}
//                       variant="primary"
//                       >
//                       View Trip
//                     </Button>
//                     {singleTrip.role == "owner" ?
//                     <Button name={singleTrip.id} onClick={handleRemove} variant="outline-danger" className="marginLeft">
//                       Delete
//                     </Button> : <h1></h1>}
//                   </Card.Body>
//                 </Card>
//               </div>
//             );
//           })
//           )}
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
//     },
//     getTripAndUserRole: (tripId) => {
//       dispatch(fetchSingleTrip(tripId))
//     }
//   };
