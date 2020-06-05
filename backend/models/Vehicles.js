const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
    admin_id: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
     },
    brand: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    motor: {
        type: String,
        required: true,
    },
    kms: {
        type: Number,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    other: {
        type: String,
        required: false,
    },
    creationDate: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Vehicle', VehicleSchema);
