import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from '../pages/Home';
import Vehicles from '../pages/Vehicles';
import NewUser from '../pages/NewUser';
import NewVehicle from '../pages/NewVehicle';

const PrivateRoutes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/vehicles" component={Vehicles} />
        <Route exact path="/users/new" component={NewUser} />
        <Route exact path="/vehicles/new" component={NewVehicle} />
      </Switch>
    </BrowserRouter>
  );
}

export default PrivateRoutes;