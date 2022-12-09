/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { useParams, Link } from "react-router-dom";
import _ from "lodash";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Card, Form, Alert } from "react-bootstrap";
import { fetchAllUsers } from "../../redux/users";
import { createNewUserTrip } from "../../redux/tripReducer";

const Searchbar = (props) => {
  const [users, setUsers] = useState(props.users.allUsers);
  const [usersNotOnTrip, setUsersNotOnTrip] = useState('');
  const [filteredUsers, setFilteredUsers] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedUser, setSelectedUser] = useState([]);
  const [userAccess, setUserAccess] = useState("");
  const [userTripInfo, setUserTripInfo] = useState({
    role: "",
    UserId: "",
    TripId: "",
  });

  const [errors, setErrors] = useState([]);
  const [show, setShow] = useState(false);
  const [showStartingView, setStartingView] = useState(true);
  const [showSelectedView, setSelectedView] = useState(false);
  const [showErrorMessage, setErrorMessage] = useState(false);
  const inputRef = useRef();

  //update to use useparams
  const { tripId } = useParams();

  const errorDictionary = {
    roleError: [7, "Must select a valid role for attendee"],
  };

  //check if error exists already
  const inCurrentErrors = (errorId) => {
    let isACurrentError;
    if (errors.length) {
      isACurrentError = errors.filter((error) => error[0] === errorId);

      if (isACurrentError.length) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  //get updated errors
  const getFilteredErrors = (errorId) => {
    const filteredErrors = errors.filter((error) => error[0] !== errorId);
    return filteredErrors;
  };

  //ERROR MESSAGE
  useEffect(() => {
    if (errors.length < 1) {
      setErrorMessage(false);
    } else {
      setErrorMessage(true);
    }
  }, [errors]);

  //SPECIFIC ERROR HANDLING
  useEffect(() => {
    if (!userAccess || userAccess === 'Choose a role') {
      if (!inCurrentErrors(7)) {
        errors.push(errorDictionary.roleError);
      }
    } else {
      setErrors(getFilteredErrors(7));
    }
  }, [userAccess]);

  useEffect(() => {
    props.fetchAllUsers();

    // initialize debounce function to search once user has stopped typing every half second
    inputRef.current = _.debounce(onSearchText, 500);
  }, []);

  useEffect(() => {
    if (props.users.allUsers.length > 0) {
      setUsers(props.users.allUsers);
      getUsersNotOnTrip(props)
    }
    if (selectedUserId) {
      getSelectedUser(selectedUserId);
    }
    if (userAccess) {
      setUserTripInfo({
        role: userAccess,
        UserId: selectedUserId,
        TripId: tripId,
      });
    }
  }, [props.users, selectedUserId, userAccess]);

  function getUsersNotOnTrip(props) {
    let filtered;
    if (props.users.allUsers.length && props.trips.singleTripView.Users.length) {
      const idsOfUsersOnTrip = props.trips.singleTripView.Users.map((user) => user.id)
      filtered = props.users.allUsers.filter((user) => {
        if (!idsOfUsersOnTrip.includes(user.id)) {
          return user
        }
      })
    }
    setUsersNotOnTrip(filtered);
  }

  function onSearchText(text, usersNotOnTrip) {
    let filtered;
    if (text && usersNotOnTrip) {
      filtered = usersNotOnTrip.filter(
        (user) =>
          user.firstName.toLowerCase().includes(text.toLowerCase()) ||
          user.lastName.toLowerCase().includes(text.toLowerCase()) ||
          user.username.toLowerCase().includes(text.toLowerCase())
      );
    } else {
      filtered = "";
    }
    setFilteredUsers(filtered);
  }

  function handleSearch(event) {
    inputRef.current(event.target.value, usersNotOnTrip);
  }

  function handleSelect(event) {
    setSelectedUserId(event.target.value);
    setStartingView(false);
    setSelectedView(true);
  }

  function handleAccess(event) {
    setUserAccess(event.target.value);
  }

  function getSelectedUser(userId) {
    setSelectedUser(users.filter((user) => user.id == userId));
  }

  const handleSubmit = (event) => {
    console.log("in search bar", userTripInfo)
    event.preventDefault();
    if (errors.length === 0) {
      props.createNewUserTrip({
        ...userTripInfo,
      });
      setFilteredUsers("");
      setSelectedUserId("");
      setSelectedUser("");
      setUserAccess("");
      setUserTripInfo("");
      setShow(false);
      setStartingView(true);
      setSelectedView(false);
      window.location.reload();
    } else {
      setErrorMessage(true);
    }
  };

  const handleClose = () => {
    setShow(false);
    setFilteredUsers("");
    setSelectedUser("");
    setStartingView(true);
    setSelectedView(false);
    setErrorMessage(false);
  };

  const handleShow = () => setShow(true);

  return (
    <div>
      <Button
        variant="primary"
        style={{
          flex: 1,
          width: "fit-contents",
          float: "right",
          marginRight: "1rem",
        }}
        onClick={handleShow}
      >
        Add Attendees
      </Button>
      <Modal show={show} onHide={handleClose} scrollable={true}>
        <Modal.Header closeButton>
          <Modal.Title>Add Attendees To Your Trip</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showStartingView && (
            <div>
              <header className="header">
                <div className="header__search">
                  <input
                    type="search"
                    placeholder="Search attendees"
                    onChange={handleSearch}
                  />
                </div>
              </header>
              <React.Fragment>
                <div className="users-list">
                  {!filteredUsers.length ? (
                    <p className="loading">No Users Found</p>
                  ) : (
                    <React.Fragment>
                      {filteredUsers.map((user) => (
                        <Card className="user" key={user.id}>
                          <Card.Body>
                            <Card.Text className="user__details">
                              <span>
                                <strong>
                                  {user.firstName} {user.lastName}{" "}
                                </strong>
                              </span>
                              <span>
                                {"@"}
                                {user.username}
                              </span>
                            </Card.Text>
                            {showStartingView && (
                              <Button
                                variant="secondary"
                                value={user.id}
                                onClick={handleSelect}
                              >
                                Add
                              </Button>
                            )}
                          </Card.Body>
                        </Card>
                      ))}
                    </React.Fragment>
                  )}
                </div>
              </React.Fragment>
            </div>
          )}
          {showSelectedView && (
            <React.Fragment>
              <div className="users-list">
                {!selectedUser.length ? (
                  <p className="loading">No User Yet</p>
                ) : (
                  <React.Fragment>
                    <Card className="user" key={selectedUser[0].id}>
                      <Card.Body>
                        <Card.Text className="user__details">
                          <span>
                            <strong>
                              {selectedUser[0].firstName}{" "}
                              {selectedUser[0].lastName}{" "}
                            </strong>
                          </span>
                          <span>
                            {"@"}
                            {selectedUser[0].username}
                          </span>
                        </Card.Text>
                        <Form.Select onChange={handleAccess}>
                          <option>Choose a role</option>
                          <option value="attendee">Attendee</option>
                          <option value="editor">Editor</option>
                          <option value="owner">Owner</option>
                        </Form.Select>
                      </Card.Body>
                    </Card>
                  </React.Fragment>
                )}
              </div>
            </React.Fragment>
          )}
        </Modal.Body>

        <Modal.Footer>
          {/* link to email form  */}
          <Link style={{ color: "darkgreen", textDecoration: "none"}} to="/invite"><p>Invite attendees via email</p></Link>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Add Attendee
          </Button>
          <Alert show={showErrorMessage} variant="danger">
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Alert.Heading>
                Please fix required fields before proceeding
              </Alert.Heading>
              <ul>
                {errors.map((error, i) => {
                  return <li key={i}>{error[1]}</li>;
                })}
              </ul>
            </div>
            <hr />
          </Alert>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const mapState = (state) => ({
  users: state.users,
  trips: state.trips
});

const mapDispatch = (dispatch) => ({
  createNewUserTrip: (userTrip) => dispatch(createNewUserTrip(userTrip)),
  fetchAllUsers: () => dispatch(fetchAllUsers()),
});

export default connect(mapState, mapDispatch)(Searchbar);