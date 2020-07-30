import React from "react";
import { Link } from "react-router-dom";
import { Navbar as Nav } from "react-bootstrap";
import { logout } from "../services/auth";
import LandingPage from "./landinPage";

const handleLogout = (props) => {
  logout().then(() => {
    props.setUser(null);
  });
};

export default function Navbar(props) {
  return (
    <Nav className="nav justify-content-end" bg="primary">
      <LandingPage />
      {props.user && <Nav.Brand>Welcome {props.user.firstName} </Nav.Brand>}
      <Nav.Brand>
        <Link to="/">Home</Link>
      </Nav.Brand>
      {props.user ? (
        <>
          <Nav.Brand>
            <Link to="/menu">Menu</Link>
          </Nav.Brand>
          <Nav.Brand>
            <Link to="/" onClick={() => handleLogout(props)}>
              Logout
            </Link>
          </Nav.Brand>
        </>
      ) : (
        <>
          <Nav.Brand>
            <Link to="/signup">Signup</Link>
          </Nav.Brand>
          <Nav.Brand>
            <Link to="/login">Login</Link>
          </Nav.Brand>
        </>
      )
      }
    </Nav>
  );
}
