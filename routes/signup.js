const path = require('path');

const express = require('express');

const userController = require('../controllers/signup');



const router = express.Router();

router.post('/signup', userController.AddUser);
router.get('/getusers/:useremail', userController.getuser);

module.exports = router;
