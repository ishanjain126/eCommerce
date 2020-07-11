const express = require("express")
const router = express.Router()


const { requireSignin, isAuth } = require('../controllers/auth')
const { userById } = require("../controllers/user")
const { create } = require("../controllers/order")

// have to create a middleware to set the orders in the users purchase history
router.post('/create/:userId', requireSignin, isAuth, create);
router.param('userId', userById);


module.exports = router;
