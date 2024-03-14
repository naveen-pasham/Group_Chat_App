

const express = require('express');

const groupAdminController = require('../controllers/groupAdmin');



const router = express.Router();

router.post('/makeadmin', groupAdminController.makeadmin);


module.exports = router;
