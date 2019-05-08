import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import authFunctions from '../../utils/Auth'




const SecuredRoute = ({component: Component, ...rest}) => (
 
    <Route {...rest} render={(props) => (
        authFunctions.loggedIn() === true
       ? <Component {...props} />
       : <Redirect to={{
         pathname: '/login',
         state: {from: props.location}
       }} />
      )}
    />
  )
export default SecuredRoute;
