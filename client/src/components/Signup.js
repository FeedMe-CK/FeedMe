import React, { Component } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { signup } from "../services/auth";
import SearchLocationInput from "./SearchLocationInput";

export default class Signup extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
    placeId: "",
    message: "",
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  updateAddress = (address, placeId) => {
    this.setState({
      address,
      placeId,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const {
      firstName,
      lastName,
      email,
      password,
      address,
      placeId,
    } = this.state;

    signup(firstName, lastName, email, password, address, placeId).then(
      (data) => {
        if (data.message) {
          this.setState({
            message: data.message,
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            address: "",
            placeId: "",
          });
        } else {
          this.props.setUser(data);
        }
      }
    );
  };

  render() {
    return (
      <>
        <h2>Signup</h2>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label htmlFor="firstName">First name: </Form.Label>
            <Form.Control
              type="text"
              id="firstName"
              name="firstName"
              value={this.state.firstName}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="lastName">Last Name: </Form.Label>
            <Form.Control
              type="text"
              id="lastName"
              name="lastName"
              value={this.state.lastName}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="email">E-Mail: </Form.Label>
            <Form.Control
              type="text"
              id="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="password">Password: </Form.Label>
            <Form.Control
              type="password"
              id="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </Form.Group>
          {/* <Form.Group>
            <Form.Label htmlFor="address">Address: </Form.Label> */}
          <SearchLocationInput
            state={this.state}
            handleChange={this.handleChange}
            updateAddress={this.updateAddress}
            onChange={() => null}
          />
          {/* <Form.Control type='text' id='address' name='address' value={this.state.address} onChange={this.handleChange}/> */}
          {/* </Form.Group> */}
          {this.state.message && (
            <Alert variant="danger">{this.state.message}</Alert>
          )}
          <Button type="submit">Signup</Button>
        </Form>
      </>
    );
  }
}
