const mongoose = require('mongoose');

const userSchemea = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min:2,
        max:255
    },
    email: {
        type: String,
        required: true,
        min:8,
        max:255
    },
    password: {
        type: String,
        required: true,
        min:6,
        max:1024
    },
},{collection:"Users"});

module.exports = mongoose.model('User', userSchemea);
