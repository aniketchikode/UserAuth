const db = require('../config/dbconfig.js');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const User = db.users;

// API for User Register
exports.register = (req, res) => {
    
  User.findOne({ where: { email: req.body.email } }).then(user => {

    if (user) {
      return res.status(409).json({ message: 'User is already present' });
    } else {

      bcrypt.hash(req.body.password, 10, function (err, hash) {
        if (err) {
          return res.status(401).json({
            error: err,
          });
        } else {

          User.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: hash,
            mobileno: req.body.mobileno,
            address: req.body.address,
          }).then(data => {

            res.status(200).json({
              success: '200',
              message: 'Registerd Successfully',
            })
          })
        }
      })

    }
  })
}


// API for Login
exports.login = (req, res) => {

  User.findOne({ where: { email: req.body.email } }).then(user => {

    if (!user) {
      return res.status(404).json({ message: 'Check your email'});
    } else {

      bcrypt.compare(req.body.password, user.password, function (err, result) {
        if (err) {
          console.log(err);
          return res.status(401).json({ error: err, });

        } else {

          if (result) {

            const token = jwt.sign({ id: user.id }, "secretKey", {
            });
            res.status(200).json({ message: 'Login Successfully',
              id: user.id,
              token: token
            })
          }
          else {
            return res.status(401).send("Please check Password");
          }
        }
      })
    }
  })


}