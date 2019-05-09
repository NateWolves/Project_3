
import { GoogleLogin } from 'react-google-login';
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, FormGroup, FormControl, Form } from "react-bootstrap";
import "./Login.css";
import API from "../../utils/api"
import Cookies from "js-cookie"

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
      <div className="container">
      <div className="bufferForNav"></div>
      <div className="Login col-sm-8">
           <Link to="/" className="btn">
               Back to home
            </Link>
            <div className="col-sm-12" style={{ paddingLeft: "11.250px" }}>
              <p className="">
               Don't have an account? <Link to="/signup">Sign up here!</Link>
              </p>
            </div>
      <div className="d-flex justify-content-center">
                    {/* <GoogleLogin
                        clientId= {process.env.AUTH_CLIENT_ID}
                        buttonText="Login with Google"
                        onSuccess={this.googleResponse}
                        onFailure={this.googleResponse}
                    /> */}
        </div>
        <form onSubmit={this.handleSubmit}>
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
    );
  }
}