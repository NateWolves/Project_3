import React, { Component } from 'react';
import { BrowserRouter as Router, Route, } from 'react-router-dom';


// import Header from './components/Header';
import './index.css'
import Navbar from './components/Navbar';
import Home from './pages/Homepage';
import Login from './pages/Login';
import User from './components/User';
import Timeline from './pages/Timeline';
import Callback from './components/Callback';
import SecuredRoute from './components/SecuredRoute';
import Footer from './components/Footer';
import Trips from './pages/Trips';
import Signup from './pages/Signup'
import Auth from './utils/Auth'
import AuthService from './utils/Auth';




class App extends Component {
  constructor() {
    super();
    this.state = { isAuthenticated: false, user: null, token: ''};
}

logout = () => {
    this.setState({isAuthenticated: false, token: '', user: null})
};

googleResponse = (response) => {
  const tokenBlob = new Blob([JSON.stringify({access_token: response.accessToken}, null, 2)], {type : 'application/json'});
  const options = {
      method: 'POST',
      body: tokenBlob,
      mode: 'cors',
      cache: 'default'
  };
  fetch('http://localhost:8080/api/auth/google', options).then(r => {
      const token = r.headers.get('x-auth-token');
      r.json().then(user => {
          if (token) {
              console.log(token)
              this.setState({isAuthenticated: true, user, token})
          }
      });
  })
};

render() {

    return (
      <div>
        <Router>
          <Navbar />
          <Route exact path='/' component={Home} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/timeline' component={Timeline} />
          <Route exact path='/callback' component={Callback} />
          <Route exact path='/trips' component={Trips} />
          <Route exact path='/trips/:id' component={Timeline} />
          <SecuredRoute exact path='/user' component={User} />
          <Footer />
        </Router>
      </div>
    );
  }
}

export default App;
