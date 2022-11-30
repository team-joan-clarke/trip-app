import React from "react";
import { connect } from "react-redux";
import { updatingUser } from "../redux/users";
import { fetchUser, deletingUser } from "../redux/users";

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
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
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

  handleClick() {
    let result = confirm("Are you sure you want to delete user?");
    if (result) {
      this.props.deleteUser();
    }
  }

  render() {
    const { handleChange, handleSubmit, handleClick } = this;
    const firstName = this.props.user.firstName || "";
    const lastName = this.props.user.lastName || "";
    const username = this.props.user.username || "";
    const email = this.props.user.email || "";
    const phoneNumber = this.props.user.phoneNumber || "";

    return (
      <div>
        <h3>Update User Profile</h3>
        <form className="form" onSubmit={handleSubmit}>
          <label>First Name: {firstName}</label>
          <input
            type="text"
            name="firstName"
            placeholder="new first name"
            defaultValue={this.state.firstName}
            onChange={handleChange}
          />

          <label>Last Name: {lastName}</label>
          <input
            type="text"
            name="lastName"
            placeholder="new last name"
            defaultValue={this.state.lastName}
            onChange={handleChange}
          />
          <label> username: {username}</label>
          <input
            type="text"
            name="username"
            placeholder="new username"
            defaultValue={this.state.username}
            onChange={handleChange}
          />
          <label>Email: {email} </label>
          <input
            type="email"
            name="email"
            placeholder="new email"
            defaultValue={this.state.email}
            onChange={handleChange}
          />
          <label>Phone Number: {phoneNumber} </label>
          <input
            type="tel"
            required
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            name="phoneNumber"
            placeholder="format: 000-000-0000"
            defaultValue={this.state.phoneNumber}
            onChange={handleChange}
          />
          <label> Password</label>
          <input
            type="password"
            name="password"
            placeholder="password"
            defaultValue={this.state.password}
            onChange={handleChange}
          />
          {this.state.error != "" && <p>{this.state.error}</p>}
          <button type="submit">Update Profile</button>
        </form>
        <button type="button" onClick={handleClick}>
          Delete User
        </button>
      </div>
    );
  }
}
const mapState = (state) => ({
  user: state.users,
  error: state.users.error,
});

const mapDispatch = (dispatch) => ({
  updateUser: (userInfo) => dispatch(updatingUser(userInfo)),
  fetchUser: () => dispatch(fetchUser()),
  deleteUser: () => dispatch(deletingUser()),
});

export default connect(mapState, mapDispatch)(UpdateUser);
