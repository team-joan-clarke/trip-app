import React from "react";
import { connect } from "react-redux";
import { updatingUser } from "../redux/users";
import { fetchUser, deletingUser } from "../redux/users";
import { Form, Row, Col, Button, Alert } from "react-bootstrap";

//PHONE NUMBER VALIDATION:
function validatePhoneNumber(input_str) {
  var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

  return re.test(input_str);
}

export class UpdateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
      username: this.props.user.username,
      email: this.props.user.email,
      password: this.props.user.password,
      phoneNumber: this.props.user.phoneNumber,
      error: this.props.user.error,
      show: false,
      phoneAlert: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleShow = this.handleShow.bind(this);
  }
  componentDidMount() {
    this.props.fetchUser();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.user !== this.state.user) {
      this.props.fetchUser();
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.phoneNumber) {
      if (!validatePhoneNumber(this.state.phoneNumber)) {
        return this.setState({ phoneAlert: true });
      }
    }
    this.props.updateUser({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      username: this.state.username,
      email: this.state.email,
      phoneNumber: this.state.phoneNumber,
      password: this.state.password,
    });
    event.target.reset();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleClick(e, id) {
    console.log("props in update user form", id);
    this.props.deleteUser(id);
    this.handleShow(false);
  }

  handleShow(boolean) {
    this.setState({ show: boolean });
  }

  render() {
    const { handleChange, handleSubmit, handleClick, handleShow } = this;
    const firstName = this.props.user.firstName || "";
    const lastName = this.props.user.lastName || "";
    const username = this.props.user.username || "";
    const email = this.props.user.email || "";
    const phoneNumber = this.props.user.phoneNumber || "";

    const show = this.state.show;
    const phoneAlert = this.state.phoneAlert;
    return (
      <div>
        <div
          style={{
            width: "80%",
            flexDirection: "row",
            flexWrap: "wrap",
            padding: "2rem",
            borderRadius: "5px",
            boxShadow: "2px 1px 20px grey",
            margin: "5rem auto",
          }}
        >
          <Alert show={show} variant="danger">
            <Alert.Heading>
              Are you sure you want to delete this task?
            </Alert.Heading>
            <p>
              To delete, press the delete button. To cancel request, press
              cancel.
            </p>
            <hr />
            <div className="d-flex justify-content-end">
              <Button onClick={() => handleShow(false)} variant="secondary">
                Cancel
              </Button>
              <Button
                onClick={(e) => handleClick(e, this.props.user.id)}
                variant="danger"
              >
                Delete
              </Button>
            </div>
          </Alert>
          <div
            style={{
              float: "right",
            }}
          >
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => handleShow(true)}
            >
              Delete User
            </Button>
          </div>

          <Form className="form" onSubmit={handleSubmit}>
            {/* {Phone number validation:} */}
            <div>
              <Alert show={phoneAlert} variant="warning">
                <Alert.Heading>
                  Please fix the following before proceeding:
                </Alert.Heading>
                <p style={{ display: "block" }}>
                  Phone numbers may ONLY contain numbers, parenthesis, and or
                  dashes.
                </p>
                <hr />
                <div className="d-flex justify-content-end">
                  <Button
                    onClick={() => this.setState({ phoneAlert: false })}
                    variant="secondary"
                    style={{
                      marginRight: "1rem",
                      borderRadius: "50px",
                      float: "right",
                    }}
                  >
                    Close
                  </Button>
                </div>
              </Alert>
            </div>
            <h3>Update User Profile</h3>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>First Name: {firstName}</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    placeholder="new first name"
                    defaultValue={this.state.firstName}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Last Name: {lastName}</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    placeholder="new last name"
                    defaultValue={this.state.lastName}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>username: {username}</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    placeholder="new username"
                    defaultValue={this.state.username}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="mb-3">
                  <Form.Label> Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="password"
                    defaultValue={this.state.password}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Email: {email}</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="new email"
                defaultValue={this.state.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone Number: {phoneNumber}</Form.Label>
              <Form.Control
                type="tel"
                name="phoneNumber"
                placeholder="phone number"
                defaultValue={this.state.phoneNumber}
                onChange={handleChange}
              />
            </Form.Group>

            {this.state.error != "" && <p>{this.state.error}</p>}

            <Button type="submit">Update Profile</Button>
          </Form>
        </div>
      </div>
    );
  }
}
const mapState = (state) => ({
  user: state.users.allUsers,
  error: state.users.error,
});

const mapDispatch = (dispatch) => ({
  updateUser: (userInfo) => dispatch(updatingUser(userInfo)),
  fetchUser: () => dispatch(fetchUser()),
  deleteUser: () => dispatch(deletingUser()),
});

export default connect(mapState, mapDispatch)(UpdateUser);
