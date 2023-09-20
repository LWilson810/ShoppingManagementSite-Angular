const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('./keys');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    // console.log("dfdfd");
    User.findById(jwt_payload._id)
      .then(user => {
        if(user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      })
      .catch(err => console.log(err));
    // console.log(jwt_payload);
    // if(jwt_payload.userID === 'admin') {
    //   const user = {
    //     name: jwt_payload.name,
    //     userID: jwt_payload.userID,
    //     id: jwt_payload.id
    //   }
    //   return done(null, user);
    // } else {
    //   User.findById(jwt_payload.id)
    //   .then(user => {
    //     if(user) {
    //       return done(null, user);
    //     } else {
    //       return done(null, false);
    //     }
    //   })
    //   .catch(err => console.log(err));
    // }
  }))
}