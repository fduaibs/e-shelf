import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Vehicles from './pages/Vehicles';
import NewVehicle from './pages/NewVehicle';


export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/vehicles" exact component={Vehicles} />
        <Route path="/vehicles/new" component={NewVehicle} />
      </Switch>
    </BrowserRouter>
  )
}