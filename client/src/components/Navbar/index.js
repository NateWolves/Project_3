import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import auth0Client from '../../utils/Auth';
import { Nav, Navbar, Container } from 'react-bootstrap';
import './Navbar.css';
import title from './images/title.png';

function NavBar(props) {
  const signOut = () => {
    auth0Client.signOut();
    props.history.replace('/');
  };
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Container className="navContainer">
        <Navbar.Brand href="/">
          <img
            width={50}
            height={50}
            src={title}
            alt={"title"}
            className="compassBrand"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link>
              {
                !auth0Client.isAuthenticated() &&
                <button className="navbtn" onClick={auth0Client.signIn}>Sign In</button>
              }
              {
                auth0Client.isAuthenticated() &&
                <div>
                  <Link
                    to="/trips"
                    className="mr-2 text-white">
                      {auth0Client.getProfile().name}
                  </Link>
                  <button className="navbtn" onClick={() => { signOut() }}>Sign Out</button>
                </div>
              }
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default withRouter(NavBar);