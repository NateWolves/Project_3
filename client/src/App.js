import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './components/Header';
import Navbar from './components/Navbar';
import Home from './pages/Homepage';
import Login from './components/Login';
import User from './components/User';
import Plan from './components/Plan';
import Timeline from './components/Timeline';
import Event from './components/Event';
import Meal from './components/Meal';
import Callback from './components/Callback';
import SecuredRoute from './components/SecuredRoute';
import Footer from './components/Footer';

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Navbar/>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/plan' component={Plan} />
          <Route exact path='/timeline' component={Timeline} />
          <Route exact path='/event' component={Event} />
          <Route exact path='/meal' component={Meal} />
          <Route exact path='/callback' component={Callback} />
          <SecuredRoute exact path='/user' component={User} />
          <Footer />
        </Router>
      </div>
    );
  }
}

export default App;
