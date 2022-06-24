const mongoose = require('mongoose');

const predictionSchemea = new mongoose.Schema({
    name:{
        type: String,
        required:true,
    },
    prediction: {
        type: Number,
        required: true,
    },
},{collection:"Predictions"});

module.exports = mongoose.model('Prediction', predictionSchemea);