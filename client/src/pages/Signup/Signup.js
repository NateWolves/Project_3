import React, { Component } from "react";
import { Link } from "react-router-dom";
import { GoogleLogin } from 'react-google-login';
import { Button, FormGroup, FormControl, Form } from "react-bootstrap";
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
      this.props.history.push("/user", {})
    }).catch(err => console.log(err))
  };

render() {

return (
      <div className="container">
        <div className="row">
          <div className="col-sm-8 offset-s2">
            <Link to="/" className="btn">
               Back to home
            </Link>
            <div className="col-sm-12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Register</b> below
              </h4>
              <p className="">
                Already have an account? <Link to="/login">Log in</Link>
              </p>
            </div>
                <div className="container">
      <div className="Login">
      <div className="d-flex justify-content-center">
                    <GoogleLogin
                        clientId= {process.env.AUTH_CLIENT_ID}
                        buttonText="Login with Google"
                        onSuccess={this.googleResponse}
                        onFailure={this.googleResponse}
                    />
        </div>
        <form onSubmit={this.onSubmit}>
        <FormGroup controlId="name" >
            <Form.Label>User Name</Form.Label>
            <FormControl
              autoFocus
              type="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="email" >
            <Form.Label>Email</Form.Label>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" >
            <Form.Label>Password</Form.Label>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <FormGroup controlId="password2" >
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
      </div>
      </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Signup;