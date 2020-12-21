const mongoose = require('mongoose');
const article = require('./articleSchema');
const cookieParser = require('cookie-parser');
const userProfile = require('./userInfo');
const Article = mongoose.model('article', article, 'articles');
const Profile = mongoose.model('profile', userProfile, 'profile');
const connectionString = 'mongodb+srv://wei:Abcd%401234@cluster0.uucbc.mongodb.net/All_USER?retryWrites=true&w=majority';
const connector =  mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
const session = require('./auth');
const uploadImage = require('./uploadCloudinary');
var sessionUser = session.sessionUser;
let cookieKey = "sid";
function getArticle(req, res) {
  let id = req.params.id;
  let username = req.username;
  if (id == null) {
    Profile.findOne({username: username}, function (err, doc){
      if (err) {
        console.log(err);
        res.send(404);
      }
      else {
        let followers = doc.followers;
        let userQuery = [];
        userQuery.push(username);
        for (var i = 0; i < followers.length; ++i) {
          userQuery.push(followers[i]);
        }
        Article.find({author: userQuery}).sort([['date', -1]]).limit(10).exec(function(err, articles){
            res.send(articles)});
      }
   });
  }
  else {
    Article.findOne({_id: id}, function (err,doc) {
      res.send(doc);
    });
  }
}

function updateArticle(req, res) {
  let id = req.params.id;
  let text = req.body.text;
  let commentId = req.body.commentId;
  if (commentId == null) {
    Article.findOne({_id: id}, function (err, doc) {
      doc.text = text;
      doc.save();
      res.send(doc);
    });
  }
  else {
    if (commentId == '-1') {
      Article.findOne({_id: id}, function (err, doc) {
        doc.comments.push({commentId: doc.comments.length, text: text, author: req.username});
        doc.markModified('comments');
        doc.save();
        res.send(doc);
      });
    }
    else {
      var stringId = parseInt(commentId);
      Article.updateOne({'_id' : id, 'comments.commentId': stringId}, {'$set': {
        'comments.$.text': text
      }}, function(err) {
    });
    Article.findOne({_id: id}, function (err, doc) {
      res.send(doc);
    });
  }
}
}

function addArticle(req, res) {
  let text = req.body.text;
  let username = req.username;
  let fileurl = req.body.image;
  Article.countDocuments({}, function (err, count) {
    if (err) {
      console.log(err);
      res.send(400);
    }
    else {
      let id = count + 1;
      var newArt = new Article({
        _id: id,
        author: username,
        text: text,
        date: new Date(),
        comments: [],
        image: fileurl
      });
      connector.then(()=> {
        newArt.save(() => {
          Article.find({}).then(doc => res.send(doc));
        });
      })
    }
  });
}

function image(req, res) {
  const avatar = req.fileurl;
  res.send({image: avatar});
}

module.exports = (app) => {
    app.use(cookieParser());
    app.get('/articles/:id?', getArticle);
    app.put('/articles/:id', updateArticle);
    app.post('/article', addArticle);
    app.put('/image', uploadImage('avatar'), image);
}
