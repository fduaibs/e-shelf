const { Router } = require('express');

const UserController = require('../controllers/UserController');
const VehicleController = require('../controllers/VehicleController');
const LoginController = require('../controllers/LoginController');
const JwtController = require('../controllers/JwtController');

const routes = Router();

routes.get('/vehicles', VehicleController.index);
routes.get('/vehicle', VehicleController.show);
routes.post('/vehicles/new', JwtController.authenticateAccessToken, VehicleController.store);
routes.put('/vehicles/:id', JwtController.authenticateAccessToken, VehicleController.update);
routes.delete('/vehicles/:id', JwtController.authenticateAccessToken, VehicleController.destroy);

routes.get('/users', JwtController.authenticateAccessToken, UserController.index);
routes.get('/user', JwtController.authenticateAccessToken, UserController.show);
routes.post('/users/new', JwtController.authenticateAccessToken, UserController.store);
routes.put('/users/:id', JwtController.authenticateAccessToken, UserController.update);
routes.delete('/users/:id', JwtController.authenticateAccessToken, UserController.destroy);

routes.get('/login', LoginController.login);
routes.delete('/logout', JwtController.authenticateRefreshToken, LoginController.logout);

routes.post('/token', JwtController.store);

module.exports = routes;