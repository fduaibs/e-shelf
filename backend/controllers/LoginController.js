const JwtController = require('./JwtController');

const UserModel = require('../models/Users');
const RefreshTokenModel = require('../models/RefreshTokens');

module.exports = {
  async login(request, response) {
    const [, hash64] = request.headers.authorization.split(' ');
    const [email, password] = Buffer.from(hash64, 'base64').toString().split(':');
    try {
      const user = await UserModel.findOne({ email: email }).select('name email password isAdmin');
      if(!user || !(user.password === password)) return response.sendStatus(403);

      const refreshToken = await JwtController.createRefreshToken(user.toObject());
      const accessToken = JwtController.createAccessToken(user.toObject());
      const { password: filteredPassword, ...userWithoutPassword } = user.toObject(); 
      response.json({ user: userWithoutPassword, refreshToken: refreshToken, accessToken: accessToken });

    } catch(error) {
      response.status(400).json(error);
    }
  },

  async logout(request, response) {
    const user = request.user;
    if(!user) return response.sendStatus(401);
    
    let { refreshToken } = request.body;
    
    try {
      refreshToken = await RefreshTokenModel.deleteOne({ token: refreshToken });
      if(!refreshToken.deletedCount) return response.sendStatus(404);
      return response.json({ _id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin });  
    } catch(error) {
        response.status(400).json(error);
    }
  }
}