import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';

export default function AdminRoute({ component: Component, ...rest }) {
  const { signed, loadingUser, user } = useAuth();

  return (
    <Route  {...rest}  render={props =>
      !loadingUser ? (
        signed ? (
          user.isAdmin ? (
            <Component {...props} />
          ) : (
            <Redirect to="/404" />
          )
        ) : (
          <Redirect to="/login"/>
        )
      ) : (
        <div />
      )
    }/>
  );
} 