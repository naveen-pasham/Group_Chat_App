const userGroup=require('../models/usergroup');
const User=require('../models/signup');
const Group=require('../models/group');
const Sequelize = require('sequelize');



exports.getUserGroups=async (req,res,next)=>{
    try{ 

        let groups=[]
        const usergroups=await userGroup.findAll({where:{userId:req.user.id}});
        
       for(let user of usergroups){
           await Group.findOne({where:{id:user.groupId}}).then(group=>{
            let obj= {id:group.id,name:group.name}
          //  console.log(obj)
            groups.push(obj);
           })
       
        };
        
       // console.log(groups)
        res.send(groups);
        
    }
    catch(err){
        console.log(err);

    }
} 


exports.addUserGroup = async (req,res,next)=>{
    try{ 
        
        await userGroup.create({userId:req.body.userId,groupId:req.body.groupId});
    res.send({message:'sucess'});
}
    catch(err){
        console.log(err);
    }
   
}


exports.deleteuser=async (req,res,next)=>{
    try{

        const groupId=req.body.groupid;
        const userid=req.body.userid;
        await userGroup.destroy({where:{groupId:groupId,userId:userid}})
        const group=   await Group.findOne({where:{id:groupId}});
        let members=JSON.parse(group.members)
        let index=await members.indexOf(userid);
        if (index > -1) { 
            members.splice(index, 1); 
          }
          await group.update({members:members});
    console.log(members)
       // await userGroup.destroy({where:{userId:userID}});
        res.send({message:'success'});
      
    }
    
    catch(err){
        console.log(err);
    

    }

}

exports.deleteUserData=async (req,res,next)=>{
    try{
        const groupId=req.params.groupid;
      await userGroup.destroy({where:{groupId:groupId,userId:req.user.id}})
    const group=   await Group.findOne({where:{id:groupId}});
    let members=JSON.parse(group.members)
    let index=await members.indexOf(req.user.id);
    if (index > -1) { 
        members.splice(index, 1); 
      }
      await group.update({members:members});
console.log(members)
   // await userGroup.destroy({where:{userId:userID}});
    res.send({message:'success'});

    }
    catch(err){
        console.log(err);
    }
    
}