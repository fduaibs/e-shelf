import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Home from './pages/Home';
import Login from './pages/Login';
import NewUser from './pages/NewUser';
import Vehicles from './pages/Vehicles';
import NewVehicle from './pages/NewVehicle';

export const history = createBrowserHistory();

export default function Routes() {

  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/users/new" component={NewUser} />
        <Route path="/login" component={Login} />
        <Route path="/vehicles" exact component={Vehicles} />
        <Route path="/vehicles/new" component={NewVehicle} />
      </Switch>
    </Router>
  )
};