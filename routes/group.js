const express=require('express');
 
const router=express.Router();

const groupController=require('../controllers/group');
const userauthentication = require('../middleware/auth');

router.post('/addgroup',userauthentication.authenticate,  groupController.groupAdd);
router.get('/data/:groupid',userauthentication.authenticate, groupController.getGroup);



module.exports=router; 