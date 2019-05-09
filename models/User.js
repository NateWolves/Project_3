const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
  userId:{
    type: String
  },
  email: {
    type: String, 
    trim: true, unique: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  },
  name: {
    type: String
  },
  password: {
    type: String
  },
  googleProvider: {
    type: {
        id: String,
        token: String
      },
    select: false
  },
  trips: [
    {
      type: ObjectId,
      ref: "Trip"
    }
  ]
});



UserSchema.methods.isCorrectPassword = function(password, callback) {
  bcrypt.compare(password, this.password, function(err, same) {
    if (err) {
      callback(err);
    } else {
      callback(err, same);
    }
  });
}

UserSchema.set('toJSON', {getters: true, virtuals: true});

UserSchema.statics.upsertGoogleUser = function(accessToken, refreshToken, profile, cb) {
  var that = this;
  return this.findOne({
      'googleProvider.id': profile.id
  }, function(err, user) {
      // no user was found, lets create a new one
      if (!user) {
          var newUser = new that({
              name: profile.displayName,
              email: profile.emails[0].value,
              googleProvider: {
                  id: profile.id,
                  token: accessToken
              }
          });

          newUser.save(function(error, savedUser) {
              if (error) {
                  console.log(error);
              }
              return cb(error, savedUser);
          });
      } else {
          return cb(err, user);
      }
  });
};

const User = mongoose.model("User", UserSchema);

module.exports = User;


// For future use with social media logins

// UserSchema.statics.upsertTwitterUser = function(token, tokenSecret, profile, cb) {
//   var that = this;
//   return this.findOne({
//       'twitterProvider.id': profile.id
//   }, function(err, user) {
//       // no user was found, lets create a new one
//       if (!user) {
//           var newUser = new that({
//               email: profile.emails[0].value,
//               twitterProvider: {
//                   id: profile.id,
//                   token: token,
//                   tokenSecret: tokenSecret
//               }
//           });

//           newUser.save(function(error, savedUser) {
//               if (error) {
//                   console.log(error);
//               }
//               return cb(error, savedUser);
//           });
//       } else {
//           return cb(err, user);
//       }
//   });
// };

// UserSchema.statics.upsertFbUser = function(accessToken, refreshToken, profile, cb) {
//   var that = this;
//   return this.findOne({
//       'facebookProvider.id': profile.id
//   }, function(err, user) {
//       // no user was found, lets create a new one
//       if (!user) {
//           var newUser = new that({
//               fullName: profile.displayName,
//               email: profile.emails[0].value,
//               facebookProvider: {
//                   id: profile.id,
//                   token: accessToken
//               }
//           });

//           newUser.save(function(error, savedUser) {
//               if (error) {
//                   console.log(error);
//               }
//               return cb(error, savedUser);
//           });
//       } else {
//           return cb(err, user);
//       }
//   });
// };