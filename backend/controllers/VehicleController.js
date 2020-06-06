const VehicleModel = require('../models/Vehicles');

module.exports = {
  async index (request, response) {
    try {
      const vehicles = await VehicleModel.find();
      response.json(vehicles);
    } catch(error) {
      response.status(400).json(error);
    }
  },

  async store(request, response) {
    const { _id: userId } = request.user;
    const { brand, model, year, motor, kms, color, price, other } = request.body;
    try {
      const vehicle = await VehicleModel.create({
        admin_id: userId,
        brand: brand,
        model: model,
        year: year,
        motor: motor,
        kms: kms,
        color: color,
        price: price,
        other: other,
      });
      response.status(201).json(vehicle);
    } catch(error) {
      response.status(400).json(error);
    }
  },

  async show(request, response) {
    const vehicleId = request.query.id;
    if(!vehicleId) return response.sendStatus(404);

    try {
      const vehicle = await VehicleModel.findOne({ _id: vehicleId });
      if(!vehicle) return response.sendStatus(404);

      return response.json(vehicle.toObject());
    } catch(error) {
      response.status(400).json(error);
    }
  },

  async update(request, response) {
    const vehicleId = request.params.id;
    if(!vehicleId) return response.sendStatus(404);

    const { brand, model, year, motor, kms, color, price, other } = request.body;
    try {
      const vehicle = await VehicleModel.findOneAndUpdate(
        { _id: vehicleId },
        { brand: brand, model: model, year: year, motor: motor, kms: kms, color: color, price: price, other: other },
      );
      if(!vehicle) return response.sendStatus(404);
      const updatedVehicle = await VehicleModel.findOne({ _id: vehicleId });
      return response.json({ old: vehicle, updated: updatedVehicle });
    } catch(error) {
      return response.json(error);
    }
  },

  async destroy(request, response) {
    const vehicleId = request.params.id;
    if(!vehicleId) return response.sendStatus(404);
    try {
      const vehicle = await VehicleModel.findOneAndDelete({ _id: vehicleId }); 
      if(!vehicle) return response.sendStatus(404);
      response.json(vehicle.toObject());
    } catch(error) {
      response.status(400).json(error);
    }
  }
}