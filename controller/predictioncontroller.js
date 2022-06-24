const Prediction = require('../model/Prediction');



exports.getprediction = async (req, res) => {
    const pred= await Prediction.findOne({ name: "EGX30" });
    res.status(200).send(pred);
};

exports.addprediction = async (req, res) => {
    const newpred = new Prediction({
        name: "EGX30",
        prediction : req.body.prediction,
    });
    try {
        await newpred.save();
        res.status(200).send("predction has been added to database successfully");
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.updateprediction = async (req, res) => {
    try {
        await Prediction.findOneAndUpdate({name:"EGX30"},{prediction: req.body.prediction});
        res.status(200).send("Prediction has been updated");
    } catch (error) {
        res.status(400).send(error);
    }
    
};