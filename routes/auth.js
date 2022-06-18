const router = require('express').Router();
const authcontoller = require('../controller/authcontroller');
const isAuth = require("../middleware/isAusth");

router.post('/signup', authcontoller.signup_post);
router.post('/login', authcontoller.login_post);
router.post('/logout', isAuth, authcontoller.logout_post);
module.exports = router;