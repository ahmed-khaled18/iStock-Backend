const router = require('express').Router();
const authcontoller = require('../controller/authcontroller');

router.post('/signup', authcontoller.signup_post);
router.post('/login', authcontoller.login_post);
router.post('/logout', authcontoller.logout_post);
module.exports = router;