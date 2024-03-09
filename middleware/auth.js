const jwt = require('jsonwebtoken');
const User = require('../models/signup');

const authenticate = (req, res, next) => {

    try {
        const token = req.header('Authorization');
        const user = jwt.verify(token, process.env.TOKEN_SECRET);
        console.log(user);
        User.findByPk(user).then(user => {
            req.user = user;
            next();
        })

      } catch(err) {
        console.log(err);
        return res.status(401).json({success: false})
        // err
      }

}

module.exports = {
    authenticate
}