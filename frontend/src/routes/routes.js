import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { AuthProvider } from '../contexts/AuthContext';

import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';

import NavBar from '../components/NavBar';
import Home from '../components/Home';
import Login from '../components/Login';
import Vehicles from '../components/Vehicles';
import NewUser from '../components/NewUser';
import NewVehicle from '../components/NewVehicle';
import NotFound from '../components/NotFound';


const Routes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NavBar/>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/vehicles" component={Vehicles} />
          <PrivateRoute exact path="/vehicles/new" component={NewVehicle} />
          <AdminRoute exact path="/users/new" component={NewUser} />
          <Route patch="*" component={NotFound} />
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default Routes;