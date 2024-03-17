
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors=require('cors');
const dotenv = require('dotenv');
const sequelize = require('./util/database');
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

dotenv.config();

const app = express();

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
  origin: "*",
  methods: ["POST","GET","PUT","DELETE"],
  credentials: true
}));
app.use(bodyParser.json({ extended: false }));

app.use('/user', userRoutes);
app.use('/chat', messageRoutes);
app.use('/group',groupRoutes);
app.use('/usergroups',userGroupesRoutes);
app.use('/admin',admingroupRoutes);
app.use('/password',forgotpasswordRoutes);


app.use((req,res)=>{
  console.log('url', req.url);
  res.sendFile(path.join(__dirname, `views/${req.url}`))
})

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

sequelize
// .sync({alter: true})
// .sync({force: true})
.sync()
  .then(result => {
   // console.log(result)
    app.listen(process.env.PORT);
  })
  .catch(err => {
    console.log(err);
  });