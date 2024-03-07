
const User = require('../models/signup');
const bcrypt=require('bcrypt');

exports.AddUser = async(req, res) => {
  try{
  const username=req.body.name;
  const number=req.body.number;
  const email=req.body.email;
  const password=req.body.password;
  bcrypt.hash(password,10,async(err,hash)=>{
  await User.create({
    username:username,
    phonenumber:number,
    email:email,
    password:hash,
  });
   return  res.status(201).json({message:"Succesfully Created New User"});
  })
}
catch(err){
 res.status(500).json(err);
}

};


exports.getuser=(req,res,next)=>{
  const email=req.params.useremail
  User.findOne({where :{email:email}}).then(user=>{
    res.json(user);
  }).catch(err=>console.log(err))
};
