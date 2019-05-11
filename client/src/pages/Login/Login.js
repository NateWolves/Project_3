import { GoogleLogin } from 'react-google-login';
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, FormGroup, FormControl, Form, Container, Col, Row } from "react-bootstrap";
import "./Login.css";
import API from "../../utils/api"
import Cookies from "js-cookie"
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  googleResponse = (e) => {};
  onFailure = (error) => {
    alert(error);
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    let newLogin = {}
    newLogin.email = this.state.email
    newLogin.password = this.state.password

    API.loginUser(newLogin).then(res => {
      
      Cookies.set('user', res.data.token, { expires: 5 });
      this.props.history.push("/", {})
    }).catch(err => console.log(err))
    this.setState({email:"", password: ""})
  }

  render() {
    return (

      <Container fluid={true} className="loginContainer" style={{minHeight: '100vh'}}>
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
              <p>
               Don't have an account? <Link to="/signup">Sign up here!</Link>
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
          <form onSubmit={this.handleSubmit}>
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