const express = require("express");
const router = express.Router();

// This is a test change to see if thing build again 

const { requireSignin, isAuth } = require('../controllers/auth')
const { userById } = require("../controllers/user")
const { generateToken, processPayment } = require("../controllers/braintree")


router.get('/braintree/getToken/:userId', requireSignin, isAuth, generateToken );
router.post('/braintree/payment/:userId', requireSignin, isAuth, processPayment );


router.param('userId', userById);
module.exports = router;
