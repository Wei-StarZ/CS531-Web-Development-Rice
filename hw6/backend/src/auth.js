const md5 = require('md5');
const cookieParser = require('cookie-parser');
let sessionUser = {};
const session = require('express-session');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');
const userSchema = require('./userSchema');
const userProfile = require('./userInfo');
const User = mongoose.model('user', userSchema, 'users');
const Profile = mongoose.model('profile', userProfile, 'profile');
const connectionString = 'mongodb+srv://wei:Abcd%401234@cluster0.uucbc.mongodb.net/All_USER?retryWrites=true&w=majority';
let cookieKey = "sid";
const connector =  mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
const redis = require('redis').createClient('redis://h:pcfbde3ef2a6c0825e711e80421f23a882df0cf57b7cec18720c07ddc5c740a64@ec2-54-80-174-182.compute-1.amazonaws.com:21879');
let facebook = {};

passport.serializeUser(function(user, done) {
    facebook[user.id] = user;
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    var user = facebook[id];
    done(null, user);
});

passport.use(new FacebookStrategy({
    clientID: '3962962217048469',
    clientSecret: '5b13e210202519be09e05f578d195552',
    callbackURL: "/auth/facebook/callback"
},
    function(accessToken, refreshToken, profile, done) {
        let user = {
            'name' : profile.displayName,
            'id'   : profile.id,
            'token': accessToken
        };
        var username = profile.displayName;
        // You can perform any necessary actions with your user at this point,
        // e.g. internal verification against a users table,
        // creating new user entries, etc.

        User.findOne({username: username}, function(err, userObj) {
            if (err) {
              return done(err);
            }
            else {
              if (!userObj) {
                let salt = username + new Date().getTime();
                let hash = md5(salt.toString() + "facebook");
                newUser = new User({
                    username: username,
                    salt: salt,
                    hash: hash
                });
                connector.then(()=> {newUser.save()});
                var userProfile = new Profile({
                  username: username,
                  email: '1@2.com',
                  dob: new Date(),
                  zipcode: 11011,
                  followers: [],
                  headline: "I love react!",
                  avatar: ""
                });
                connector.then(()=> {userProfile.save()});
              }
              else {
                newUser = user;
              }
            }
        });
        return done(null, user);
    })
);

function isLoggedIn(req, res, next) {
    // likely didn't install cookie parser
    if (req.isAuthenticated()) {
      //console.log(req.user.name);
      req.username = req.user.name;
      next();
    }
    else {
      if (!req.cookies) {
         return res.sendStatus(401);
      }
      let sid = req.cookies[cookieKey];
      if (!sid) {
          return res.sendStatus(401);
      }
      redis.hgetall('sessions', function(err, userObj){
      if (userObj){
            req.username = userObj[sid];
            next();
      }
      else{
        res.status(401);
      }
    });
    }
}

function login(req, res) {
    let username = req.body.username;
    let password = req.body.password;
    // supply username and password
    var salt;
    var storedHash;
    if (!username || !password) {
        return res.sendStatus(400);
    }
    User.countDocuments({username: username}, function (err, count){
      if (count > 0) {
        User.findOne({username: username}, function (err, doc){
          if (err) {
            console.log(err);
          }
          else {
            salt = doc.salt;
            storedHash = doc.hash;
            let hash = md5(salt + password);
            if (hash === storedHash) {
                let sid = hash;
                sessionUser[sid] = username;
                redis.hmset('sessions', sid, username);
                res.cookie(cookieKey, sid, { maxAge: 3600 * 1000 * 10, httpOnly: true, secure: false});
                let msg = {username: username, result: 'success'};
                res.send(msg);
            }
            else {
              res.sendStatus(401);
            }
          }
       });
      }
      else {
        return res.sendStatus(401);
      }
    });
}

function register(req, res) {
    let username = req.body.username;
    let password = req.body.password;
    let zipcode = req.body.zipcode;
    let dob = new Date(req.body.dob);
    let email = req.body.email;
    // supply username and password
    if (!username || !password) {
        return res.sendStatus(400);
    }
    let salt = username + new Date().getTime();
    let hash = md5(salt.toString() + password); // TODO: Change this to use md5 to create a hash
    var user = new User({
        username: username,
        salt: salt,
        hash: hash
    });
    connector.then(()=> {user.save()});
    var profile = new Profile({
      username: username,
      email: email,
      dob: dob,
      zipcode: zipcode,
      followers: [],
      headline: "I love react!",
      avatar: ""
    });
    connector.then(()=> {profile.save()});
    let msg = {result: 'success', username: username};
    res.send(msg);
}

function logout(req, res) {
  if (req.isAuthenticated()) {
    delete facebook[req.user.id];
    req.session.destroy();
    req.logout();
    res.send('OK');
  }
  else {
    let sid = req.cookies[cookieKey];
    sessionUser[sid] = null;
    redis.del(sid);
    res.send('OK');
  }
}

module.exports = (app) => {
    app.use(cookieParser());
    app.use(session({
    secret: 'doNotGuessTheSecret',
    resave: false,
    saveUninitialized: true}));
    app.use(passport.initialize());
    app.use(passport.session());
    app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));
    app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { successRedirect: 'http://localhost:3001/Main',
        failureRedirect: 'http://localhost:3001/Landing' }));
    app.post('/login', login);
    app.post('/register', register);
    app.use(isLoggedIn);
    app.put('/logout', logout);
}

module.exports.sessionUser = sessionUser;
