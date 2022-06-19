const router = require('express').Router();
const watchListcontroller = require('../controller/watchlistcontroller');

router.post('/get',watchListcontroller.getlist);
router.post('/delete',watchListcontroller.deletefromlist);
router.put('/add',watchListcontroller.addtolist);

module.exports = router;