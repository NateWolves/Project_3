import React, { Component } from "react";
import { Link } from "react-router-dom";
import { GoogleLogin } from 'react-google-login';
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
      errors: {}
    };
  }

onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

onSubmit = e => {
    e.preventDefault();
const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
console.log(newUser);
    API.createUser(newUser).then(res => {
      authFunctions.setToken(res.data.token)
    }).catch(err => console.log(err))
  };

render() {
    const { errors } = this.state;
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
            <GoogleLogin
                        clientId= {process.env.AUTH_CLIENT_ID}
                        buttonText="Login with Google"
                        onSuccess={this.googleResponse}
                        onFailure={this.googleResponse}
            />
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input col-sm-12">
                <input
                  onChange={this.onChange}
                  value={this.state.name}
                  error={errors.name}
                  id="name"
                  type="text"
                >
                </input>
                <label htmlFor="name">Name</label>
              </div>
              <div className="input col-sm-12">
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field col-sm-12">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                />
                <label htmlFor="password">Password</label>
              </div>
              <div className="input-field col-sm-12">
                <input
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                />
                <label htmlFor="password2">Confirm Password</label>
              </div>
              <div className="col-sm-12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn "
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Signup;