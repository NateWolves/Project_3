import React from 'react';
import {withRouter, Link} from 'react-router-dom';
import {Nav, Navbar, Container} from 'react-bootstrap';
import './Navbar.css';
import title from './images/title.png';
import Auth from "../../utils/Auth"

function NavBar(props) {
  const signOut = () => {
    Auth.logout()
    props.history.replace('/');
  };
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Container className="navContainer">
        <Navbar.Brand href="/">
        <span className="icon" data-icon-name="explore">
            <svg version="1.1" className="icon-compass" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
              width="40px" height="40px" viewBox="0 0 100 100" enable-background="new 0 0 100 100">
              <g>
                <rect x="16.787" y="48.787" fill="#FFFFFF" width="8.582" height="2.292"/>
                <rect x="48.853" y="74.562" fill="#FFFFFF" width="2.26" height="8.58"/>
                <rect x="48.853" y="16.562" fill="#FFFFFF" width="2.26" height="8.58"/>
                <rect x="74.587" y="48.787" fill="#FFFFFF" width="8.593" height="2.292"/>
                <path fill="#FFFFFF" d="M49.983,5C25.135,5,5,25.144,5,50.017C5,74.846,25.135,95,49.983,95C74.854,95,95,74.846,95,50.017
                  C95,25.144,74.854,5,49.983,5z M49.983,88.189c-21.031,0-38.177-17.133-38.177-38.172c0-21.073,17.147-38.206,38.177-38.206
                  c21.064,0,38.177,17.133,38.177,38.206C88.16,71.057,71.048,88.189,49.983,88.189z"/>
              </g>
              <path className="needle" fill="#FFFFFF" d="M33.701,22.563l9.606,29.698l20.947,23.198l-9.605-29.72L33.701,22.563z M48.983,52.044
                c-1.692,0-3.083-1.386-3.083-3.083c0-1.736,1.392-3.077,3.083-3.077c1.703,0,3.083,1.341,3.083,3.077
                C52.066,50.658,50.686,52.044,48.983,52.044z"/>
            </svg>
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link>
              {
                !Auth.loggedIn() &&
                <button className="navbtn" href="/signup" >Sign In</button>
              }
              {
                Auth.loggedIn() &&
                <div>
                  <Link
                    to="/trips"
                    className="mr-2 text-white">
                      {Auth.getProfile().name}
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