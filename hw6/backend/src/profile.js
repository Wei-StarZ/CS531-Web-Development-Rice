const md5 = require('md5');
const cookieParser = require('cookie-parser');
const session = require('./auth');
const mongoose = require('mongoose');
const userProfile = require('./userInfo');
const userSchema = require('./userSchema');
const Profile = mongoose.model('profile', userProfile, 'profile');
const User = mongoose.model('user', userSchema, 'users');
const connectionString = 'mongodb+srv://wei:Abcd%401234@cluster0.uucbc.mongodb.net/All_USER?retryWrites=true&w=majority';
const connector =  mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
var sessionUser = session.sessionUser;
let cookieKey = "sid";
const uploadImage = require('./uploadCloudinary');

function updateHeadline(req, res) {
  let username = req.username;
  Profile.findOne({username: username}, function (err, doc){
    if (err) {
      console.log(err);
    }
    else {
      doc.headline = req.body.headline;
      doc.save();
    }
 });
 let msg = {username: username, headline: req.body.headline};
 res.send(msg);
}

function getHeadline(req, res) {
  var username;
  if (req.params.user != null) {
    username = req.params.user;
  }
  else {
    username = req.username;
  }
  Profile.findOne({username: username}, function (err, doc){
    if (err) {
      console.log(err);
      res.send(404);
    }
    else {
      let headline = doc.headline;
      let msg = {username: username, headline: headline};
      res.send(msg);
    }
 });
}
//Todo: Below are all stubs!!!!!

function getFollower(req, res) {
  var username;
  if (req.params.user != null) {
    username = req.params.user;
  }
  else {
    username = req.username;
  }
  Profile.findOne({username: username}, function (err, doc){
    if (err) {
      console.log(err);
      res.sendStatus(404);
    }
    else {
      let followers = doc.followers;
      let msg = {username: username, following: followers};
      res.send(msg);
    }
 });
 //res.sendStatus(200);
}

function updateFollower(req, res) {
  var added_user = req.params.user;
  var currentuser = req.username;
  Profile.countDocuments({username: added_user}, function (err, count) {
    if (count > 0) {
      Profile.findOne({username: currentuser}, function (err, doc){
        if (err) {
          console.log(err);
          res.send(401);
        }
        else {
          doc.followers.push(added_user);
          doc.save();
          let msg = {username: currentuser, following: doc.followers};
          res.send(msg);
        }
     });
    }
    else {
      res.sendStatus(404);
    }
  });
}

function deleteFollower(req, res) {
  var deleted_user = req.params.user;
  var currentuser = req.username;
  Profile.findOne({username: currentuser}, function (err, doc){
    if (err) {
      console.log(err);
      res.send(404);
    }
    else {
      for (var i = 0; i < doc.followers.length; ++i) {
        if (doc.followers[i] == deleted_user) {
          doc.followers.splice(i, 1);
          break;
        }
      }
    }
    doc.save();
    let msg = {username: currentuser, following: doc.followers};
    res.send(msg);
 });
}

function getEmail(req, res) {
  var username;
  if (req.params.user != null) {
    username = req.params.user;
  }
  else {
    username = req.username;
  }
  Profile.findOne({username: username}, function (err, doc){
    if (err) {
      console.log(err);
      res.send(404);
    }
    else {
      let email = doc.email;
      let msg = {username: username, email: email};
      res.send(msg);
    }
 });
}

function updateEmail(req, res) {
  let username = req.username;
  Profile.findOne({username: username}, function (err, doc){
    if (err) {
      console.log(err);
    }
    else {
      doc.email = req.body.email;
      doc.save();
    }
 });
 let msg = {username: username, email: req.body.email};
 res.send(msg);
}

function getZip(req, res) {
  var username;
  if (req.params.user != null) {
    username = req.params.user;
  }
  else {
    username = req.username;
  }
  Profile.findOne({username: username}, function (err, doc){
    if (err) {
      console.log(err);
      res.send(404);
    }
    else {
      let zipcode = doc.zipcode;
      let msg = {username: username, zipcode: zipcode};
      res.send(msg);
    }
 });
}

function updateZip(req, res) {
  let username = req.username;
  Profile.findOne({username: username}, function (err, doc){
    if (err) {
      console.log(err);
    }
    else {
      doc.zipcode = req.body.zipcode;
      doc.save();
    }
 });
 let msg = {username: username, zipcode: req.body.zipcode};
 res.send(msg);
}

function getDob(req, res) {
  var username;
  if (req.params.user != null) {
    username = req.params.user;
  }
  else {
    username = req.username;
  }
  Profile.findOne({username: username}, function (err, doc){
    if (err) {
      console.log(err);
      res.send(404);
    }
    else {
      let dob = doc.dob;
      let msg = {username: username, dob: dob};
      res.send(msg);
    }
 });
}

function getAvatar(req, res) {
  var username;
  if (req.params.user != null) {
    username = req.params.user;
  }
  else {
    username = req.username;
  }
  Profile.findOne({username: username}, function (err, doc) {
    if (err) {
      console.log(err);
      res.send(404);
    }
    else {
      let avatar = doc.avatar;
      let msg = {username: username, avatar: avatar};
      res.send(msg);
    }
  });
}

function updateAvatar(req, res) {
  const username = req.username;
	const avatar = req.fileurl;
	Profile.updateOne({username: username},{$set: { avatar: avatar}},
		function(err, profiles){
      res.send({
        username: username,
        avatar: avatar
      })
    });
}

function updatePassword(req, res) {
  let username = req.username;
  let password = req.body.password;
  let salt = username + new Date().getTime();
  let hash = md5(salt.toString() + password);
  User.findOne({username: username}, function (err, doc){
    if (err) {
      console.log(err);
    }
    else {
      doc.salt = salt;
      doc.hash = hash;
      doc.save();
    }
 });
  let msg = {username: username, password: password};
  res.send(msg);
}

module.exports = (app) => {
    app.use(cookieParser());
    app.put('/headline', updateHeadline);
    app.get('/headline/:user?', getHeadline);
    app.get('/following/:user?', getFollower);
    app.put('/following/:user', updateFollower);
    app.delete('/following/:user', deleteFollower);
    app.get('/email/:user?', getEmail);
    app.put('/email', updateEmail);
    app.get('/zipcode/:user?', getZip);
    app.put('/zipcode', updateZip);
    app.get('/dob/:user?', getDob);
    app.get('/avatar/:user?', getAvatar);
    app.put('/avatar', uploadImage('avatar'), updateAvatar);
    app.put('/password', updatePassword);
}
