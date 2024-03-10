

const express = require('express');
const bodyParser = require('body-parser');
const cors=require('cors');
const dotenv = require('dotenv');
const sequelize = require('./util/database');
const User = require('./models/signup');
const Message = require('./models/message');
const group=require('./models/group');
const userGroup=require('./models/usergroup');

dotenv.config();

const app = express();

const userRoutes = require('./routes/signup');
const messageRoutes = require('./routes/message');

app.use(cors({
  origin: "*",
  methods: ["POST","GET","PUT","DELETE"],
  credentials: true
}));
app.use(bodyParser.json({ extended: false }));

app.use('/user', userRoutes);
app.use('/chat', messageRoutes);

User.hasMany(Message);
Message.belongsTo(User);


group.hasMany(Message,{constraints:true,onDelete:'CASCADE'});
Message.belongsTo(group);

User.belongsToMany(group,{through:userGroup,constraints:true,onDelete:'CASCADE'});
group.belongsToMany(User,{through:userGroup,constraints:true,onDelete:'CASCADE'});

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