const router = require('express').Router();
const predictioncontroller = require('../controller/predictioncontroller');

router.get('/get',predictioncontroller.getprediction);
router.put('/add',predictioncontroller.addprediction);
router.post('/update',predictioncontroller.updateprediction);
module.exports = router;