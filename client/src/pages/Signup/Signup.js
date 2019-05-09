import React, { Component } from "react";
import { Link } from "react-router-dom";
import { GoogleLogin } from 'react-google-login';
import { Button, FormGroup, FormControl, Form, Container, Col, Row } from "react-bootstrap";
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import authFunctions from '../../utils/Auth'
import API from '../../utils/api';

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
    };
  }
  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

onSubmit = e => {
    e.preventDefault();
const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    API.createUser(newUser).then(res => {
      authFunctions.setToken(res.data.token)
      console.log(this.props)
      this.props.history.push("/", {})
    }).catch(err => console.log(err))
  };

render() {

return (
  <Container fluid={true} className="loginContainer">
    <Container fluid={true} className="navBackground">
      <Navbar/>
    </Container>
      <br/>
      <br/>
    <Row className="contentRow justify-content-md-center">
        <Col xs={12} md={3} className="loginCol">
            <Link to="/" className="btn formText">
               Back to home
            </Link>
            <div className="formText" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Register</b> below
              </h4>
              <p>
                Already have an account? <Link to="/login">Log in</Link>
              </p>
            </div>
        </Col>
        <Col xs={12} md={3} className="loginCol justify-content-md-left">
          {/* <GoogleLogin
              clientId= {process.env.AUTH_CLIENT_ID}
              buttonText="Login with Google"
              onSuccess={this.googleResponse}
              onFailure={this.googleResponse}
          /> */}
        </Col>
    </Row>
      <br/>
    <Row className="contentRow justify-content-md-center">
        <Col xs={12} md={6} className="loginCol">
          <form onSubmit={this.onSubmit}>
          <FormGroup controlId="name" className="formText">
            <Form.Label>User Name</Form.Label>
            <FormControl
              autoFocus
              type="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="email" className="formText">
            <Form.Label>Email</Form.Label>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" className="formText">
            <Form.Label>Password</Form.Label>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <FormGroup controlId="password2" className="formText">
            <Form.Label>Re-Enter Password</Form.Label>
            <FormControl
              value={this.state.password2}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
           
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
        </form>
        </Col>  
    </Row>
        <Container fluid={true} className="footerBackground">
          <Footer/>
        </Container>
  </Container>
    );
  }
}
export default Signup;