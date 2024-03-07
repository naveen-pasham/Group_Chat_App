

const express = require('express');
const bodyParser = require('body-parser');
const cors=require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

const userRoutes = require('./routes/signup');

app.use(cors());
app.use(bodyParser.json({ extended: false }));

app.use('/user', userRoutes);


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