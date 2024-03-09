const path = require('path');

const express = require('express');
const userauthentication = require('../middleware/auth');
const messageController = require('../controllers/message');



const router = express.Router();

router.post('/message', userauthentication.authenticate, messageController.AddMessage);


module.exports = router;
