
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors=require('cors');
const dotenv = require('dotenv');
const sequelize = require('./util/database');
const Sequelize = require('sequelize');
const User = require('./models/signup');
const Message = require('./models/message');
const group=require('./models/group');
const userGroup=require('./models/usergroup');
const userAdmins=require('./models/groupAdmin');
const Forgotpassword = require('./models/forgotpassword');
const fs=require('fs');
const helmet=require('helmet');
const Compression=require('compression');
const morgan=require('morgan');
var cron = require('node-cron');
const ArchivedChat = require('./models/archivedchat');

const http = require("http");
const {Server}=require('socket.io');
dotenv.config();

const app = express();
const server = http.createServer(app);
//const io = new Server(server);

const userRoutes = require('./routes/signup');
const messageRoutes = require('./routes/message');
const groupRoutes=require('./routes/group');
const userGroupesRoutes=require('./routes/usergroup');
const admingroupRoutes=require('./routes/groupAdmin');
const forgotpasswordRoutes=require('./routes/forgotpassword');


app.use(helmet({contentSecurityPolicy:false}));
app.use(Compression());

const accessLogStream=fs.createWriteStream(
 path.join(__dirname,'access.log'),
 {flags:'a'}
);

app.use(morgan('combined',{stream:accessLogStream}));



app.use(cors({
  origin: '*',
  methods: ['GET','HEAD','PUT','PATCH','POST','DELETE'],
  credentials: true
}));

const io = new Server(server)





// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   // res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
//   // res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   next();
// })


//app.use(express.urlencoded({extended:true}));
app.use(bodyParser.urlencoded({extended:false}));

app.use(bodyParser.json({ extended: false }));



app.use('/user', userRoutes);
app.use('/chat', messageRoutes);
app.use('/group',groupRoutes);
app.use('/usergroups',userGroupesRoutes);
app.use('/admin',admingroupRoutes);
app.use('/password',forgotpasswordRoutes);
//app.use(ArchivedChatController.job)

//app.use(express.static(path.join(__dirname, 'uploads')));

app.use((req,res)=>{
  console.log('url', req.url);
  res.sendFile(path.join(__dirname, `views/${req.url}`))
})


io.on("connection", (socket) => {
socket.on("user-message", (message) => {
 // console.log(message)
  io.emit("message", message);
});
});

cron.schedule(
	'* * * * * *', // cronTime
	async function () {
    // let date=new Date()
    // console.log(date.getTime().toString())
    // console.log(new Date(new Date() - 24 * 60 * 60 * 1000).getTime().toString())
  //   {where:{createdAt: {
          
  //     [Sequelize.Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000)
  //   }}
  // }
        const messages=await Message.findAll();

        console.log(messages);
        for(let message of messages){
            // const date=new Date(message.createdAt);
            // const currentdate=new Date();
            // console.log(new Date())
            // console.log(new Date(new Date() - 1.45 * 60 * 60 * 1000))
            //  console.log(new Date(message.createdAt).toString())
            //  console.log(typeof(message.createdAt))
           
            if(new Date(new Date() - 24 * 60 * 60 * 1000).toString()==new Date(message.createdAt).toString()){
                await Message.destroy({where:{id:message.id}});
                await ArchivedChat.create({
                    username:message.username,
                    message:message.message,
                    file:message.file,
                    userId:message.userId,
                    groupId:message.groupId,
                    fileurl:message.fileurl
                })
            }
        }

      
  
	 } // onTick
	// null, // onComplete
	// true, // start
	// 'IST' // timeZone
);




User.hasMany(Message);
Message.belongsTo(User);


group.hasMany(Message,{constraints:true,onDelete:'CASCADE'});
Message.belongsTo(group);

User.belongsToMany(group,{through:userGroup,constraints:true,onDelete:'CASCADE'});
group.belongsToMany(User,{through:userGroup,constraints:true,onDelete:'CASCADE'});


User.belongsToMany(group,{through:userAdmins,constraints:true,onDelete:'CASCADE'});
group.belongsToMany(User,{through:userAdmins,constraints:true,onDelete:'CASCADE'});


User.hasMany(Forgotpassword);
Forgotpassword.belongsTo(User);
// Message.sync({force: true})
sequelize
// .sync({alter: true})
// .sync({force: true})
.sync()
  .then(result => {
   // console.log(result)
    server.listen(process.env.PORT);
  })
  .catch(err => {
    console.log(err);
  });