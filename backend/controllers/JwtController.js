require('dotenv').config();
const jwt = require('jsonwebtoken');
const RefreshTokenModel = require('../models/RefreshTokens');

module.exports = {
  authenticateAccessToken(request, response, next) {
    if(!request.headers.authorization) return response.sendStatus(401);
    const [, token] = request.headers.authorization.split(' ');
    if(!token) return response.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
      if(error) return response.sendStatus(401);
      request.user = user;
      next();
    });
  },
  authenticateRefreshToken(request, response, next) {
    const { refreshToken } = request.body;
    if(!refreshToken) return response.sendStatus(401);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
      if(error) return response.sendStatus(401);
      request.user = user;
      next();
    });
  },
  createAccessToken(user) {
    const { name, email, _id } = user;
    const accessToken = jwt.sign({ _id, name, email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' });
    return accessToken;
  },
  async createRefreshToken(user) {
    const { name, email, _id } = user;
    const refreshToken = jwt.sign({ _id, name, email }, process.env.REFRESH_TOKEN_SECRET);
    await RefreshTokenModel.create({
      admin_id: user._id,
      token: refreshToken,
    });
    return refreshToken;
  },
  async store(request, response) {
    let { refreshToken } = request.body;
    if(!refreshToken) return response.sendStatus(401);

    refreshToken = await RefreshTokenModel.findOne({ token: refreshToken });
    if(!refreshToken) return response.sendStatus(401); 
    
    jwt.verify( refreshToken.token, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
      if(error) return response.sendStatus(401);
      const { _id, name, email } = user;
      const accessToken = jwt.sign({ _id: _id, name: name, email: email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' });
      response.status(201).json({ accessToken: accessToken });
    })
  }
}