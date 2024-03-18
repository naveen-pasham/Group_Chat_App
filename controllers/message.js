

const Message = require('../models/message');
const groupAdmin=require('../models/groupAdmin');
const S3services=require('../Services/s3services');

exports.AddMessage = async(req, res) => {
  try{
  const file=req.body.file;
  const message=req.body.message;
  const groupid=req.body.groupid;

  const filename=`Image${req.user.id}/${new Date()}/${file}`;
  const fileUrl= await S3services.uploadToS3(file,filename);

  const chatdata=await Message.create({
    username:req.user.username,
    message:message,
    file:fileUrl,
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
