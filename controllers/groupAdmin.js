const groupAdmin=require('../models/groupAdmin');


exports.makeadmin= async (req,res,next)=>{
    try{
        
    const userid=req.body.userid;
    const groupid=req.body.groupid
   groupAdmin.create({
    groupId:groupid,
    userId:userid
   })
    }catch(err){
        console.log(err)
    }
}