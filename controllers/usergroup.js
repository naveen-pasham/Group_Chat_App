const userGroup=require('../models/usergroup');
const User=require('../models/signup');
const Group=require('../models/group');
const Sequelize = require('sequelize');
const groupAdmin=require('../models/groupAdmin');



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


exports.getgroup = async (req,res,next)=>{
    try{ 
        const groupid=req.params.groupid;
     const usergroups=   await userGroup.findAll({where:{groupId:groupid}});
      const users=  await User.findAll();
// console.log(usergroups);
// console.log(users)

    res.send({usergroups,users,userid:req.user.id});
}
    catch(err){
        console.log(err);
    }
   
}



exports.searcheddata = async (req,res,next)=>{
    try{ 
        const groupid=req.query.groupid;
        const search=req.query.search;
     const usergroups=   await userGroup.findAll({where:{groupId:groupid}});
      const users=  await User.findAll({ where: {
        [Sequelize.Op.or]: [
         { username: { [Sequelize.Op.like]: `%${search}%` } },
         { phonenumber: { [Sequelize.Op.like]: `%${search}%` } },
         { email: { [Sequelize.Op.like]: `%${search}%` } },
        ],
       }});
// console.log(usergroups);
 console.log(users)

    res.send({usergroups,users,userid:req.user.id});
}
    catch(err){
        console.log(err);
    }
   
}

exports.deleteuser=async (req,res,next)=>{
    try{

        const groupId=req.query.groupid;
        const userid=req.query.userid;
        console.log(groupId,userid)
        await userGroup.destroy({where:{groupId:groupId,userId:userid}})
        const group=   await Group.findOne({where:{id:groupId}});
        let members=JSON.parse(group.members)
        console.log(members)
        let index=await members.indexOf(userid);
        
           await members.splice(index, 1); 
        
          console.log(members)
          await group.update({members:JSON.stringify(members)});

   // console.log(members)
      await groupAdmin.destroy({where:{userId:userid,groupId:groupId}});
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
      await group.update({members:JSON.stringify(members)});
console.log(members)
   // await userGroup.destroy({where:{userId:userID}});
    res.send({message:'success'});

    }
    catch(err){
        console.log(err);
    }
    
}