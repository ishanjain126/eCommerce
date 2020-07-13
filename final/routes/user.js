const express = require("express")
const router = express.Router()

const { requireSignin, isAuth, isAdmin } = require('../controllers/auth')
const { userById, read, update, purchaseHistory } = require('../controllers/user')

<<<<<<< HEAD
=======

// router.get('/secret', requireSignin, (req, res) => {
//     res.json({
//         user: 'got here'
//     });
// }); 

>>>>>>> 854e0cb7e81dc464867aa8ee083c6962ef026122
router.get('/user/:userId', requireSignin, isAuth, read)
router.put('/user/:userId', requireSignin, isAuth, update)
router.get('/orders/by/user/:userId', requireSignin, isAuth, purchaseHistory);


router.param('userId', userById);


module.exports = router;
