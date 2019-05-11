import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


// import Header from './components/Header';

import './index.css'
import Home from './pages/Homepage';
import Login from './pages/Login';
import Timeline from './pages/Timeline';
import Callback from './components/Callback';
import SecuredRoute from './components/SecuredRoute';
import Trips from './pages/Trips';
import Signup from './pages/Signup'
import Anime from 'react-anime';


class App extends Component {
  constructor() {
    super();
    this.state = { isAuthenticated: false, user: null, token: '' };
  }

  // logout = () => {
  //     this.setState({isAuthenticated: false, token: '', user: null})
  // };

  // googleResponse = (response) => {
  //   const tokenBlob = new Blob([JSON.stringify({access_token: response.accessToken}, null, 2)], {type : 'application/json'});
  //   const options = {
  //       method: 'POST',
  //       body: tokenBlob,
  //       mode: 'cors',
  //       cache: 'default'
  //   };
  //   fetch('http://localhost:8080/api/auth/google', options).then(r => {
  //       const token = r.headers.get('x-auth-token');
  //       r.json().then(user => {
  //           if (token) {
  //               console.log(token)
  //               this.setState({isAuthenticated: true, user, token})
  //           }
  //       });
  //   })
  // };


  render() {

    let animeTransitions={
      duration: 1100,
			easing: 'easeInOutSine',
			translateY: ['200vh',0]
    };

    let animeHome={
      duration: 1100,
			easing: 'easeInOutSine',
			translateX: ['-200vh',0]
    };
    
    let animeTimeline={
      duration: 1100,
			easing: 'easeInOutSine',
			translateX: ['200vh',0]
    };
    return (
        <Router>
          <Anime {...animeHome}>
            <div>
              <Route exact path='/' component={Home} />
            </div>
          </Anime>

              <Route exact path='/signup' component={Signup} />

          <Anime {...animeTimeline}>
            <div>
              <Route exact path='/timeline' component={Timeline} />
            </div>
          </Anime>

          <Anime {...animeTransitions}>
            <div>
              <Route exact path='/login' component={Login} />
              <Route exact path='/callback' component={Callback} />
              <SecuredRoute exact path='/trips' component={Trips} />
              <Route exact path='/trips/:id' component={Timeline} />
            </div>
          </Anime>

        </Router>
    );
  }
}

export default App;
