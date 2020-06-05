const UserModel = require ('../models/Users');
const RefreshTokenModel = require ('../models/RefreshTokens');

const JwtController = require('./JwtController');

module.exports = {
  async index (request, response) {
    const AdminId = request.user._id;
    const Admin = await UserModel.findOne({ _id: AdminId }).select('isAdmin');
    if(!Admin.isAdmin) return response.sendStatus(403);
    try {
      const users = await UserModel.find();
      response.json(users);
    } catch(error) {
      response.status(400).json(error);
    }
  },

  async store(request, response) {
    const AdminId = request.user._id;
    const Admin = await UserModel.findOne({ _id: AdminId }).select('isAdmin');
    if(!Admin.isAdmin) return response.sendStatus(403);
    const { name, email, password } = request.body;
    try {
      let user = await UserModel.findOne({ email: email });
      if(user) return response.json({ Error:"Email already in use." });

      user = await UserModel.create({
        name: name,
        email: email,
        password: password,
      });
      const refreshToken = await JwtController.createRefreshToken(user.toObject());
      const accessToken = JwtController.createAccessToken(user.toObject());
      response.status(201).json({ 
        user: user.toObject(), 
        refreshToken: refreshToken, 
        accessToken: accessToken 
      });
    } catch (error) {
      response.status(400).json(error);
    }
  },

  async show(request, response) {
    const AdminId = request.user._id;
    const Admin = await UserModel.findOne({ _id: AdminId }).select('isAdmin');
    if(!Admin.isAdmin) return response.sendStatus(403);
    const userId = request.query.id;
    if(!userId) return response.sendStatus(404);

    try {
      const user = await UserModel.findOne({ _id: userId });
      if(!user) return response.status(404);

      return response.json(user.toObject());
    } catch(error) {
      response.status(400).json(error);
    }
  },

  async update(request, response) {
    const AdminId = request.user._id;
    const Admin = await UserModel.findOne({ _id: AdminId }).select('isAdmin');
    if(!Admin.isAdmin) return response.sendStatus(403);
    const userId = request.params.id;
    if(!userId) return response.sendStatus(404);

    const { name, email, password } = request.body;
    try {
      const user = await UserModel.findOneAndUpdate(
        { _id: userId },
        { name: name, email: email, password: password },
      );
      if(!user) return response.sendStatus(404);
      const updatedUser = await UserModel.findOne({ _id: userId });
      return response.json({ old: user, updated: updatedUser });
    } catch(error) {
      return response.json(error);
    }
  },

  async destroy(request, response) {
    const AdminId = request.user._id;
    const Admin = await UserModel.findOne({ _id: AdminId }).select('isAdmin');
    if(!Admin.isAdmin) return response.sendStatus(403);
    const userId = request.params.id;
    if(!userId) return response.sendStatus(404);

    try {
      const user = await UserModel.findOneAndDelete({ _id: userId });
      if(!user) return response.sendStatus(404);
      await RefreshTokenModel.deleteMany({ admin_id: userId });
      response.json(user.toObject());
    } catch(error) {
      response.status(400).json(error);
    }
  }
}