const path = require('path');

const express = require('express');

const userController = require('../controllers/signup');

const userauthentication = require('../middleware/auth');

const router = express.Router();

router.post('/signup', userController.AddUser);
router.get('/getusers/:useremail', userController.getuser);
router.post('/login', userController.checkuser);
router.get('/getusers',userauthentication.authenticate,  userController.getusers);
module.exports = router;
