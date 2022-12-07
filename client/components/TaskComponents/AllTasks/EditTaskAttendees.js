/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import _ from "lodash";
import { connect, useDispatch } from "react-redux";
import { fetchAllUsers } from "../../../redux/users";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Card, Form, Alert } from "react-bootstrap";
import { updateTaskUser } from "../../../redux/taskReducer";

const EditTaskAttendees = (props) => {
  const { singleTask } = props;
  const { tripId } = useParams();
  const dispatch = useDispatch();

  const [users, setUsers] = useState(props.users.allUsers);
  const [filteredUsers, setFilteredUsers] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedUser, setSelectedUser] = useState([]);
  const [userAccess, setUserAccess] = useState("");
  const [userTripInfo, setUserTripInfo] = useState({
    role: "",
    UserId: "",
    TripId: "",
  });

  const [show, setShow] = useState(false);
  const [showStartingView, setStartingView] = useState(true);
  const [showSelectedView, setSelectedView] = useState(false);
  const [role, setRole] = useState(false);
  const [deleteAttendee, setDeleteAttendee] = useState(false);
  const [alreadyAttending, setAlreadyAttending] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    dispatch(fetchAllUsers());

    // initialize debounce function to search once user has stopped typing every half second
    inputRef.current = _.debounce(onSearchText, 500);
  }, []);

  useEffect(() => {
    if (props.users.allUsers.length > 0) {
      setUsers(props.users.allUsers);
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

  function onSearchText(text, props) {
    let filtered;
    if (text && props.users.allUsers.length) {
      filtered = props.users.allUsers.filter(
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
    inputRef.current(event.target.value, props);
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
    event.preventDefault();
    event.stopPropagation();
    const users = singleTask.Users || [];
    const userIds = users.map((user) => user.id);
    let access = users.filter((user) => {
      if (user.id == selectedUserId) {
        const { role } = user.user_task;
        return role;
      }
    });
    // Validation for already on trip and same role
    if (access.length > 0) {
      let accessRole = access[0].user_task.role;
      if (accessRole === userAccess) {
        return setAlreadyAttending(true);
      }
    }

    // validation for no role chosen for person:
    if (userAccess === "") {
      return setRole(true);
    }
    dispatch(updateTaskUser(selectedUserId, singleTask.id, userAccess, "add"));

    setFilteredUsers("");
    setSelectedUserId("");
    setSelectedUser("");
    setUserAccess("");
    setUserTripInfo("");
    setShow(false);
    setStartingView(true);
    setSelectedView(false);
    window.location.reload();
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const users = singleTask.Users || [];
    const userIds = users.map((user) => user.id);
    let access = users.filter((user) => {
      if (user.id == selectedUserId) {
        const { role } = user.user_task;
        return role;
      }
    });
    //Validation for on trip:
    const isPartOfTrip = userIds.filter((userId) => {
      if (userId == selectedUserId) {
        return true;
      }
    });

    if (!isPartOfTrip[0]) {
      return setDeleteAttendee(true);
    }

    // Validation for already on trip and same role
    if (access.length > 0) {
      let accessRole = access[0].user_task.role;
      if (accessRole === userAccess) {
        return setAlreadyAttending(true);
      }
    }

    // validation for no role chosen for person:
    if (userAccess === "") {
      return setRole(true);
    }
    console.log(selectedUserId);
    dispatch(
      updateTaskUser(selectedUserId, singleTask.id, userAccess, "updateRole")
    );

    setFilteredUsers("");
    setSelectedUserId("");
    setSelectedUser("");
    setUserAccess("");
    setUserTripInfo("");
    setShow(false);
    setStartingView(true);
    setSelectedView(false);
    window.location.reload();
  };

  const handleDelete = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const users = singleTask.Users || [];
    const userIds = users.map((user) => user.id);
    const isPartOfTrip = userIds.filter((userId) => {
      if (userId == selectedUserId) {
        return true;
      }
    });

    console.log("part", isPartOfTrip[0]);

    if (!isPartOfTrip[0]) {
      return setDeleteAttendee(true);
    }
    dispatch(updateTaskUser(selectedUserId, singleTask.id, role, "remove"));

    setFilteredUsers("");
    setSelectedUserId("");
    setSelectedUser("");
    setUserAccess("");
    setUserTripInfo("");
    setShow(false);
    setStartingView(true);
    setSelectedView(false);
    window.location.reload();
  };

  const handleClose = () => {
    setShow(false);
    setAlreadyAttending(false);
    setDeleteAttendee(false);
    setRole(false);
    setFilteredUsers("");
    setSelectedUser("");
    setStartingView(true);
    setSelectedView(false);
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
        Edit Attendees
      </Button>
      <Modal show={show} onHide={handleClose} scrollable={true}>
        <Modal.Header closeButton>
          <Modal.Title>Add Attendees To Your Trip</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Alert when update without role */}
          <Alert variant="warning" show={role}>
            <Alert.Heading>Unsuccessful...</Alert.Heading>
            <hr />
            <p className="mb-0">A role must be assigned.</p>
            <div className="d-flex justify-content-end">
              <Button
                variant="outline-success"
                onClick={() => {
                  setRole(false);
                }}
              >
                Close
              </Button>
            </div>
          </Alert>

          {/* Alert when attendee is already a apart of the trip */}
          <Alert variant="warning" show={alreadyAttending}>
            <Alert.Heading>Unsuccessful...</Alert.Heading>
            <hr />
            <p className="mb-0">
              Person selected is already part of the trip as the selected role.
              Did you mean to change their role?
            </p>
            <div className="d-flex justify-content-end">
              <Button
                variant="outline-success"
                onClick={() => {
                  setAlreadyAttending(false);
                }}
              >
                Close
              </Button>
            </div>
          </Alert>

          {/* Alert when attendee is not part of task*/}
          <Alert variant="warning" show={deleteAttendee}>
            <Alert.Heading>Unsuccessful...</Alert.Heading>
            <hr />
            <p className="mb-0">Person selected is not part of this task.</p>
            <div className="d-flex justify-content-end">
              <Button
                variant="outline-success"
                onClick={() => {
                  setDeleteAttendee(false);
                }}
              >
                Close
              </Button>
            </div>
          </Alert>

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
                              <div>
                                <Button
                                  variant="secondary"
                                  value={user.id}
                                  onClick={handleSelect}
                                >
                                  Select
                                </Button>
                              </div>
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
                          <option>Access</option>
                          <option value="attendee">Attendee</option>
                          <option value="editor">Editor</option>
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
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="outline-danger" onClick={handleDelete}>
            Delete
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Update Role
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const mapState = (state) => ({
  users: state.users,
});

export default connect(mapState)(EditTaskAttendees);
