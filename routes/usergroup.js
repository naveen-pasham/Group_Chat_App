const express=require('express');
 
const router=express.Router();

const groupController=require('../controllers/usergroup');
const Authorization=require('../middleware/auth');



router.get('/getgroups',Authorization.authenticate,groupController.getUserGroups);
router.post('/add',groupController.addUserGroup);
router.get('/get/userData/:gid',groupController.getUserData);
router.get('/deletegroup/:groupid',Authorization.authenticate,groupController.deleteUserData)







module.exports=router; 