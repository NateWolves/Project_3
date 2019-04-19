import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import User from './components/User';
import Plan from './components/Plan';
import Timeline from './components/Timeline';
import Event from './components/Event';
import Meal from './components/Meal';

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Header />
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/user' component={User} />
          <Route exact path='/plan' component={Plan} />
          <Route exact path='/timeline' component={Timeline} />
          <Route exact path='/event' component={Event} />
          <Route exact path='/meal' component={Meal} />
        </Router>
      </div>
    );
  }
}

export default App;
