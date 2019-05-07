import React from 'react';
import {withRouter} from 'react-router-dom';
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