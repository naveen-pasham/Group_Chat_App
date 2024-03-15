

const Message = require('../models/message');
const groupAdmin=require('../models/groupAdmin');


exports.AddMessage = async(req, res) => {
  try{
  const message=req.body.message;
  const groupid=req.body.groupid;
  
  const chatdata=await Message.create({
    username:req.user.username,
    message:message,
    userId:req.user.id,
    groupId:groupid
  });
   return  res.status(201).json({message:"Succesfully added data", chat:chatdata});
}
catch(err){
 res.status(500).json(err);
}

};


exports.getmessages= async (req,res,next)=>{
  try{
    const groupid=req.params.groupid
 const message=await Message.findAll({where:{groupId:groupid}})
 //const admin=await groupAdmin.findAll({where:{groupId:groupid}});
    res.json({message});
}
catch(err){
  console.log(err);
}
};
