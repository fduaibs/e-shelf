import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from '../components/Home';
import Login from '../components/Login';
import Vehicles from '../components/Vehicles';
import NewUser from '../components/NewUser';
import NewVehicle from '../components/NewVehicle';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/vehicles" component={Vehicles} />
        <Route exact path="/users/new" component={NewUser} />
        <Route exact path="/vehicles/new" component={NewVehicle} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;