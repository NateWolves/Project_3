'use strict';

const passport = require('passport');
const User = require("../models/User")
const LocalStrategy = require("passport-local").Strategy;
const GoogleTokenStrategy = require('passport-google-token').Strategy
// set up a config file with Key and Secrets seperately to add to .gitignore list
// const config = require('./config.json');
// 
// const TwitterTokenStrategy = require('passport-twitter-token');
// const FacebookTokenStrategy = require('passport-facebook-token');

module.exports = function () {
    passport.use(new LocalStrategy(
        function(email, password, done) {
          User.findOne({ email: email }, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            if (!user.isCorrectPassword(password)) { return done(null, false); }
            return done(null, user);
          });
        }
      ));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
      
    passport.deserializeUser(function(id, done) {
        User.getUserById(id, function(err, user) {
          done(err, user);
        });
    });
      
    
    passport.use(new GoogleTokenStrategy({
            clientID: process.env.AUTH_CLIENT_ID,
            clientSecret: process.env.AUTH_CLIENT-SECRET
        },
        function (accessToken, refreshToken, profile, done) {
            User.upsertGoogleUser(accessToken, refreshToken, profile, function(err, user) {
                return done(err, user);
            });
        }));

        
};


// passport.use(new TwitterTokenStrategy({
//     consumerKey: config.twitterAuth.consumerKey,
//     consumerSecret: config.twitterAuth.consumerSecret,
//     includeEmail: true
// },
// function (token, tokenSecret, profile, done) {
//     User.upsertTwitterUser(token, tokenSecret, profile, function(err, user) {
//         return done(err, user);
//     });
// }));

// passport.use(new FacebookTokenStrategy({
//     clientID: config.facebookAuth.clientID,
//     clientSecret: config.facebookAuth.clientSecret
// },
// function (accessToken, refreshToken, profile, done) {
//     User.upsertFbUser(accessToken, refreshToken, profile, function(err, user) {
//         return done(err, user);
//     });
// }));
