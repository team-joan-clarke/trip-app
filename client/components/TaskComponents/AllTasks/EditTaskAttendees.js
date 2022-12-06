/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import _ from "lodash";
import { connect, useDispatch } from "react-redux";
import { fetchAllUsers } from "../../../redux/users";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Card, Form } from "react-bootstrap";
import { updateTaskUser } from "../../../redux/taskReducer";

const EditTaskAttendees = (props) => {
  const { singleTask } = props;
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
  const inputRef = useRef();

  //update to use useparams
  const { tripId } = useParams();

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

  const handleClose = () => {
    setShow(false);
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
          <Button variant="primary" onClick={handleSubmit}>
            Add Attendee
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
