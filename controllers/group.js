
const User=require('../models/signup');
const Group=require('../models/group');
const userGroup=require('../models/usergroup');
const groupAdmin=require('../models/groupAdmin');


exports.groupAdd= async (req,res,next)=>{
    try{
        
    const gname=req.body.groupname;
    const options=req.body.selectedOptions;
    options.push(req.user.id);
    // const userData=await User.findAll();
    // console.log(userData);
    // const userIddata=userData.map((user)=>{
        
    //     if(i<options.length && user.dataValues.name===options[i]){
    //         i++;
    //         return user.dataValues.id;
    //     }
    // })
    // console.log(userIddata);
     const group=await Group.create({
        name:gname,
        members:JSON.stringify(options)

     });

     const admin=await groupAdmin.create({
        groupId:group.dataValues.id,
        userId:req.user.id
     })

        //console.log(group);
        options.forEach(Option => {
            userGroup.create({
                userId:Option,
                groupId:group.dataValues.id
            })
        });

    //  for(const id of userIddata){
    //     try{
        //    await userGroup.create({
        //         userId:id,
        //         groupId:group.dataValues.id
        //     })

    //     }
    //     catch(err){
    //         console.log(err);
    //     }
        
        
        
    //  }
     res.send({message:'sucess',groupdata:group,admin:admin});}
     catch(err){
        console.log(err);
        res.send({message:'failure'});
     }
   
}


exports.updategroup= async (req,res,next)=>{
    try{
        let userdata=[]
        const groupid=req.body.groupid;
        let options=req.body.selectedOptions;

        const group= await Group.findOne({where:{id:groupid}});
        let members=await JSON.parse(group.members);
      //  console.log(members)
        for(let userid of options){
             members.push(userid);
        }
        await group.update({members:JSON.stringify(members)});
      //  console.log(members)
      options.forEach(Option => {
        userGroup.create({
            userId:Option,
            groupId:groupid
        })
    });

    for(let userid of members){
        await User.findOne({where:{id:userid}}).then(user=>{
       
         userdata.push(user);
        // console.log(userdata)
        })
    }

    res.json(userdata)
    }
    catch(err){
        console.log(err);
    }
}

exports.getGroup= async (req,res,next)=>{
    try{
        let userdata=[]
        const id=req.params.groupid;
      
        const group= await Group.findOne({where:{id:id}});
       
       // console.log(group)
       let members=await JSON.parse(group.members);
     
      for(let userid of members){
        await User.findOne({where:{id:userid}}).then(user=>{
       
         userdata.push(user);
        // console.log(userdata)
        })
    
     };
     
     const admin=await groupAdmin.findAll({where:{groupId:id}});
     
    
     res.json({userdata,group,admin,userid:req.user.id});
    }
    catch(err){
        console.log(err);
    }
    



} 