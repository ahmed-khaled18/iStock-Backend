const router = require('express').Router();
const watchListcontroller = require('../controller/watchlistcontroller');

router.get('/get',watchListcontroller.getlist);
router.delete('/delete',watchListcontroller.deletefromlist);
router.put('/add',watchListcontroller.addtolist);

module.exports = router;