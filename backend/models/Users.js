const mongoose = require('mongoose');
const crypto = require ('crypto');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
        // set: value => crypto.createHash('md5').update(value).digest('hex'),
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    signUpDate: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Users', UserSchema);