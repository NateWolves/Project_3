
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../../models/User')
const passport = require('passport')
const { generateToken, sendToken } = require('../../utils/token.utils');

router.route('/auth/google')
    .post(passport.authenticate('google-token', {session: false}), function(req, res, next) {
        if (!req.user) {
            return res.send(401, 'User Not Authenticated');
        }
        req.auth = {
            id: req.user.id,
            name: req.user.id
        };

        next();
    }, generateToken, sendToken);


router.post('/register', (req, res) => {
  const { email, password, name } = req.body;
 
  // simple validation
  if (!email || !password || !name ) {
    return res.status(400).json({ msg: "Please fill out all fields" });
  }
  // Checking if this email exists in our database
  User.findOne({ email }).then(user => {
    if (user) return res.status(400).json({ msg: "User already exists" })
  })

  const newUser = new User({ email, password, name });

  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      newUser.password = hash;
      newUser.save()
      .then(user => {
     jwt.sign({ id: user.id, email: user.email, name: user.name}, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
      if(err) throw err;
        res.json({
                  token,
                  user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                    }
                });
              })
          })
    });
  })
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    // Checking for all info
    if (!email || !password) {
      return res.status(400).json({ msg: "Please fill out all fields" });
    }
    // Checking for existing users
    User.findOne({ email })
      .then(user => {
        if (!user) return res.status(400).json({ msg: "User does not exist" });
        
      // Validating password
      bcrypt.compare(password, user.password).then(isMatch => {
        if(!isMatch) return res.status(400).json({msg: 'Invalid credentials'});

        // creating the logged in token
        jwt.sign(
                { id: user.id, email: user.email, name: user.name },
                process.env.JWT_SECRET,
                { expiresIn: 7200 },
                (err, token) => {
                  if (err) throw err;
                  res.json({
                    token,
                    user: {
                      id: user.id,
                      name: user.name,
                      email: user.email
                      }
                  });
                }
              )
            })
      })
});
   


  module.exports = router;

// // For future use of Twitter and Facebook logins
// ---------------------------------------------------------------------------



// router.route('/twitter/reverse')
//     .post(function(req, res) {
//         request.post({
//             url: 'https://api.twitter.com/oauth/request_token',
//             oauth: {
//                 oauth_callback: "http%3A%2F%2Flocalhost%3A3000%2Ftwitter-callback",
//                 consumer_key: config.twitterAuth.consumerKey,
//                 consumer_secret: config.twitterAuth.consumerSecret
//             }
//         }, function (err, r, body) {
//             if (err) {
//                 return res.send(500, { message: e.message });
//             }
//             var jsonStr = '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
//             res.send(JSON.parse(jsonStr));
//         });
//     });

// router.route('/twitter')
//     .post((req, res, next) => {
//         request.post({
//             url: `https://api.twitter.com/oauth/access_token?oauth_verifier`,
//             oauth: {
//                 consumer_key: config.twitterAuth.consumerKey,
//                 consumer_secret: config.twitterAuth.consumerSecret,
//                 token: req.query.oauth_token
//             },
//             form: { oauth_verifier: req.query.oauth_verifier }
//         }, function (err, r, body) {
//             if (err) {
//                 return res.send(500, { message: err.message });
//             }

//             const bodyString = '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
//             const parsedBody = JSON.parse(bodyString);

//             req.body['oauth_token'] = parsedBody.oauth_token;
//             req.body['oauth_token_secret'] = parsedBody.oauth_token_secret;
//             req.body['user_id'] = parsedBody.user_id;

//             next();
//         });
//     }, passport.authenticate('twitter-token', {session: false}), function(req, res, next) {
//         if (!req.user) {
//             return res.send(401, 'User Not Authenticated');
//         }
//         req.auth = {
//             id: req.user.id
//         };

//         return next();
//     }, generateToken, sendToken);

// router.route('/facebook')
//     .post(passport.authenticate('facebook-token', {session: false}), function(req, res, next) {
//         if (!req.user) {
//             return res.send(401, 'User Not Authenticated');
//         }
//         req.auth = {
//             id: req.user.id
//         };

//         next();
//     }, generateToken, sendToken);


