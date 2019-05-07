import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// import Header from './components/Header';
import './index.css'
import Navbar from './components/Navbar';
import Home from './pages/Homepage';
import Login from './components/Login';
import User from './components/User';
import Timeline from './pages/Timeline';
import Callback from './components/Callback';
import SecuredRoute from './components/SecuredRoute';
import Footer from './components/Footer';
import Trips from './pages/Trips';
import {ParallaxProvider} from 'react-scroll-parallax';

class App extends Component {
  render() {
    return (
      <ParallaxProvider>
        <Router>
          <Navbar />
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/timeline' component={Timeline} />
          <Route exact path='/callback' component={Callback} />
          <Route exact path='/trips' component={Trips} />
          <Route exact path='/trips/:id' component={Timeline} />
          <SecuredRoute exact path='/user' component={User} />
          <Footer />
        </Router>
      </ParallaxProvider>
    );
  }
}

export default App;
