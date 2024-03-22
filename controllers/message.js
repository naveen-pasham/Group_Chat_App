

const Message = require('../models/message');
const groupAdmin=require('../models/groupAdmin');
const S3services=require('../Services/s3services');

const multer=require('multer');
const path=require('path');
const { response } = require('express');

exports.AddMessage = async(req, res) => {
  try{

    
   //  console.log(req.file)
     let arr=await new Response(req.file).arrayBuffer()
    //  console.log(arr)
    //  console.log(Buffer.from(arr))
    // console.log(req.body.groupid)
     //console.log(req.user.id)
  const file=req.file.filename;
  const message=req.body.message;
  const groupid=req.body.groupid;
//console.log(typeof(file))
   const filename=`Image${req.user.id}/${req.file.filename}`;
   const fileUrl= await S3services.uploadToS3(Buffer.from(arr),filename,req.file.mimetype,req.file.encoding);
// console.log(fileUrl);
  const chatdata=await Message.create({
    username:req.user.username,
    message:message,
    file:file,
    userId:req.user.id,
    groupId:groupid,
    fileurl:fileUrl
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


const storage=multer.diskStorage({
  destination: (req,file,cb)=>{
  //  console.log(file)
    return cb(null, 'uploads')
  },
  filename:(req,file,cb)=>{
   return cb(null, Date.now()+path.extname(file.originalname))
  }
});

exports.upload= multer({
  storage:storage
  // limits:{fileSize:'10000000'},
  // fileFilter:(req,file,cb)=>{
  //   const filTypes=/jpeg|jpg|png|gif|/
  //   const mimeType=filTypes.test(file.mimetype)
  //   const extname=filTypes.test(path.extname(file.originalname))

  //   if(mimeType && extname){
  //     return cb(null,true)
  //   }
  //   cb('Give proper files format to upload')
 // }
}).single('file')