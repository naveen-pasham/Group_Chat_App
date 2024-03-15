const express=require('express');
 
const router=express.Router();

const groupController=require('../controllers/usergroup');
const Authorization=require('../middleware/auth');



router.get('/getgroups',Authorization.authenticate,groupController.getUserGroups);
router.get('/getgroup/:groupid',Authorization.authenticate, groupController.getgroup);
router.get('/deleteuser',groupController.deleteuser);
router.get('/deletegroup/:groupid',Authorization.authenticate,groupController.deleteUserData);
router.get('/getsearchdata',Authorization.authenticate,groupController.searcheddata);






module.exports=router; 