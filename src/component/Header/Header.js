import React from "react";
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import useFirebase from "../../hooks/useFirebase";
import "./Header.css";

const Header = () => {
  const { User, handleSignOut } = useFirebase({});
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Link className="LinkStyle" to="/">
                Home
              </Link>
              <Link className="LinkStyle" to="/simple">
                Simple-Login
              </Link>
              <Link className="LinkStyle" to="/more-simple">
                More-Simple
              </Link>
              
              {User?.uid ? <Button variant="secondary" onClick={handleSignOut}>Sign Out</Button> : ""}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
