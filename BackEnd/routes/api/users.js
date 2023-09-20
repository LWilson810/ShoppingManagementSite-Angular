const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const UnsignedUser = require('../../models/UnsignedUser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');

const passport = require('passport');
const {registerValidation} = require('../../validation/register');
const loginValidation = require('../../validation/login');
const keys = require('../../config/keys');
const fs = require('fs');
const LoggedUser = require('../../models/LoggedUser');


function generateToken(user) {
  return jwt.sign(user, keys.secretOrKey, {
    expiresIn: keys.expiresIn
  });
}

router.post('/register', (req, res, next) => {
//  console.log(req.body);
  const errors = {};
  User.find()
  .then(users => {
    const index = users.map(user => user.user.email).indexOf(req.body.email);
    if(index == -1) {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          if(err) throw err;
          const newUser = new User({
            user: {
              email: req.body.email,
              password: hash,
              name: req.body.lastName + '.' + req.body.firstName,
              authority: req.body.authority,
              logo: req.body.logo
            },

            userinfo: {
              address: req.body.address,
              phone: req.body.phone,
              gender: req.body.gender,
              age: req.body.age,
              timezone: req.body.timezone,
              skills: req.body.skills,
              resume: req.body.description
            }

          });
          
          newUser.save().then(user => {
            if(req.body.file) {
              let folderpath = 'D:\\Team Project(Angular)\\src\\assets';
              const fileDest = path.join(folderpath, `/uploadAvatar/${user._id}`);
              // console.log(fileDest)
              const ws = fs.createWriteStream(fileDest);
              ws.write(req.body.file);
              ws.end();
            }  
            res.json({message:'sign up success'});
          })
        })
      })
    } else {
      errors.email = "That email address already exists.";
      return res.status(400).json(errors);
    }
  })
});

router.post('/addNewStaff', (req, res) => {
  console.log(req.body);
  const error = {}
  UnsignedUser.findOne({email: req.body.email})
  .then(user => {
    if(user) {
      error.text = "Email address already exists."
      return res.status(403).json(error);
    } else {
      var data = req.body;
      data['name'] = req.body.first_name + " " + req.body.second_name;
      delete data['first_name'];
      delete data['second_name'];
      const newUser = new UnsignedUser(data);
      newUser.save().then(user => {
        res.json({ message:'New User Registered.', data:{}});
      })
    }
  })
})

router.post('/getStaff', passport.authenticate('jwt', {session: false}), (req ,res) => {
  console.log(req.body);
  var members = [];
  switch(req.body.myAuthority) {
    case 'president':
      {
        User.find()
        .then(users => {
          members = members.concat(users);
          console.log(members);
          res.json({data:members});
        })
        break;
      }
      
      
    case 'vice_president':
      {
        User.find()
        .then(users => {
          members = members.concat(users.filter(user => user.authority == 'shopkeeper' || user.authority == 'staff'));
          res.json({data:members});
        });
        break;
      }
    case 'shopkeeper':
      {
        User.find({authority:'staff', field: req.body.myField, shop: req.body.myShop}, null, null)
        .then(users => {
          members = members.concat(users);
          res.json({data:members});
        });
        break;
      }
    default:
      {
        res.json({data:[]});
        break;
      }

  }
})

router.post('/checkRegister', (req, res) => {
  const error = {}
  UnsignedUser.findOne({email: req.body.email})
  .then(user => {
    if(user) {
      res.json({message:'Check Success', data:{}});
    } else {
      error.text = "You haven't been registered"
      return res.status(403).json(error);
    }
  })
})

router.post('/signup', (req, res) => {
  console.log(req.body);
  const error = {}
  User.findOne({userID: req.body.userID})
  .then(signed => {
    if(signed) {
      error.text = "User ID Duplicates.";
      return res.status(403).json(error);
    } else {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          UnsignedUser.findOne({email: req.body.email})
          .then(user => {
            const newUser = new User({
              ...user._doc,
              userID: req.body.userID,
              password: hash
            });
            newUser.save().then((save) => {
              UnsignedUser.findOneAndRemove({_id: user._id})
              .then(() => {
                res.json({message:'Sign Up Success', data:{}});
              })  
            })
          })
        })
      })
    }
  })
})

router.post('/signin', (req, res) => {
 console.log(req.body);
  const error = {}
  User.findOne({userID: req.body.userID})
  .then(user => {
    if(user) {
      bcrypt.compare(req.body.password, user.password)
      .then(isMatch => {
        if(isMatch) {
          LoggedUser.findOne({userID: req.body.userID})
          .then(logged => {
            if(logged) {
              error.text = "You have already signed in."
              res.status(403).json(error);
            } else {
              const newUser = new LoggedUser({
                userID: req.body.userID
              });
              newUser.save().then((saved) => {
                jwt.sign(user._doc, keys.secretOrKey, {expiresIn: keys.expiresIn}, (err, token) => {
                  if(err) throw err;
                  res.status(200).json({message:'Login Success', data: {info:user._doc, token: token}});
                })
              });
            }
          })
        } else {
          error.text = "Your password is incorrect.";
          res.status(403).json(error);
        }
      })
    } else {
      error.text = "Your user ID is incorrect or please sign up.";
      res.status(403).json(error);
    }
  })
  .catch(err => res.status(500).json(err));
})

router.delete('/signout', passport.authenticate('jwt', {session:false}), (req, res) => {
  console.log(req.body);
  LoggedUser.findOne({userID: req.body.userID})
  .then(logged => {
    LoggedUser.findOneAndRemove({_id: logged._id}).then(() => {
      res.status(200).json({message:"Sign Out Success", data:{}});
    });
  })
})


module.exports = router;