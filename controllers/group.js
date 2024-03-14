
const User=require('../models/signup');
const Group=require('../models/group');
const userGroup=require('../models/usergroup');


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
console.log(group);
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
     res.send({message:'sucess',groupdata:group});}
     catch(err){
        console.log(err);
        res.send({message:'failure'});
     }
    






    

    
}
exports.getGroup= async (req,res,next)=>{
    try{
        let userdata=[]
        const id=req.params.groupid;
      
        const group= await Group.findOne({where:{id:id}});
       // console.log(group)
       let members=JSON.parse(group.members);
     
       for(let id of members){
        await User.findOne({where:{id:id}}).then(user=>{
       
         userdata.push(user);
        // console.log(userdata)
        })
    
     };
     
    
     res.send({userdata,group});
    }
    catch(err){
        console.log(err);
    }
    



} 