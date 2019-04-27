import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import auth0Client from '../../utils/Auth';
import Home from '../Home';
import title from './images/title.png';

function NavBar(props) {
  const signOut = () => {
    auth0Client.signOut();
    props.history.replace('/');
  };

  return (
    <div>

      <nav className="navbar navbar-dark bg-primary fixed-top">
        <Home />
        <Link className="navbar-brand" to="/">
          <img
            width={50}
            height={50}
            src={title}
            alt={"title"}
            className="compassBrand"
          />
        </Link>

        {
          !auth0Client.isAuthenticated() &&
          <button className="btn btn-dark" onClick={auth0Client.signIn}>Sign In</button>
        }
        {
          auth0Client.isAuthenticated() &&
          <div>
            <label className="mr-2 text-white">{auth0Client.getProfile().name}</label>
            <button className="btn btn-dark" onClick={() => { signOut() }}>Sign Out</button>
          </div>
        }
      </nav>

    </div>

  );
}

export default withRouter(NavBar);