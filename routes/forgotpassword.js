const path = require('path');

const express = require('express');

const forgotpasswordController = require('../controllers/forgotpassword');

const router = express.Router();
router.post('/forgotpassword', forgotpasswordController.forgotpassword);
router.get('/resetpassword/:resetpasswordId', forgotpasswordController.resetpassword);
router.get('/updatepassword/:resetpasswordId', forgotpasswordController.updatepassword);


module.exports = router;
