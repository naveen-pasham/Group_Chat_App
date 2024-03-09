

const Message = require('../models/message');


exports.AddMessage = async(req, res) => {
  try{
  const message=req.body.message;
  
  const chatdata=await Message.create({
    username:req.user.username,
    message:message,
    userId:req.user.id
  });
   return  res.status(201).json({message:"Succesfully added data", chat:[chatdata]});
}
catch(err){
 res.status(500).json(err);
}

};


exports.getmessages=(req,res,next)=>{
  Message.findAll().then(user=>{
    res.json(user);
  }).catch(err=>console.log(err))
};
