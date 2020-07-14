import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';

export default function PrivateRoute({ component: Component, ...rest }) {
  const { signed, loadingUser } = useAuth();

  return (
    <Route  {...rest}  render={props =>
      !loadingUser ? (
        signed ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login"/>
        )
      ) : (
        <div />
      )
    }/>
  );
} 