import React from "react";
import {Link, withRouter} from "react-router-dom";
import { connect } from 'react-redux';
import {storeArticles, changeComment, searchArticle, storeTempArticles, storeUser, storeDict, storeFollower, unfollow, addArticle, addFollower, changeUser, changeLogin} from './actions';

class Main extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      headline: "",
      newHeadline: "",
      newfollower: "",
      newArticle: "",
      allfollower: [],
      followheadline: [],
      followavatar: [],
      login: true,
      userAvatar: "",
      file: "",
      articleAvatar: ""
    }
    this.handleClick = this.handleClick.bind(this);
    this.AddFollower = this.AddFollower.bind(this);
    this.LogOut = this.LogOut.bind(this);
    this.Profile = this.Profile.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.AddFollower = this.AddFollower.bind(this);
    this.handlePost = this.handlePost.bind(this);
    this.handleUnfollow = this.handleUnfollow.bind(this);
    this.handleUpdateArt = this.handleUpdateArt.bind(this);
    this.handleCommentUpdate = this.handleCommentUpdate.bind(this);
  }

  componentDidMount() {
      var url = "http://localhost:3000";
      var followingUrl = url + '/following';
        fetch(followingUrl, {method: 'GET', headers: {'Content-Type': 'application/json'}, credentials: 'include'}).then(res => res.json()).then(res => {
          var followers = res["following"];
          this.props.changeUser(res['username']);
          this.setState({allfollower: followers});
          for (var i = 0; i < followers.length; ++i) {
            var headlineUrl = url + '/headline/' + followers[i];
            fetch(headlineUrl, {method: 'GET', headers: {'Content-Type': 'application/json'}, credentials: 'include'}).then(res => res.json()).then(res => {
              var headline = this.state.followheadline;
              headline.push(res["headline"]);
              this.setState({followheadline: headline});
            });
            var avatarUrl = url + '/avatar/' + followers[i];
            fetch(avatarUrl, {method: 'GET', headers: {'Content-Type': 'application/json'}, credentials: 'include'}).then(res => res.json()).then(res => {
              var avatar = this.state.followavatar;
              avatar.push(res["avatar"]);
              this.setState({followavatar: avatar});
            });
          }
        }).then(res => {
          var articleUrl = url + '/articles';
          fetch(articleUrl, {method: 'GET', headers: {'Content-Type': 'application/json'}, credentials: 'include'}).then(res => res.json()).then(res => {
            var c = [];
            for (var i = 0; i < res.length; ++i) {
              var temp = [];
              temp.push(res[i]["author"]);
              temp.push(new Date(res[i]["date"]).toString());
              temp.push(res[i]["text"]);
              temp.push(res[i]["image"]);
              temp.push(new Date(res[i]["date"]).getTime());
              temp.push(res[i]["author"]);
              temp.push(res[i]['comments']);
              temp.push("");
              temp.push("Hide Comments");
              temp.push(res[i]["_id"]);
              c.push([...temp]);
            }
            this.props.storeArticles(c);
          }).then(res => {
            var d = [];
            for (var i = 0; i < this.state.allfollower.length; ++i) {
              var temp = [];
              temp.push(this.state.allfollower[i]);
              temp.push(this.state.followheadline[i]);
              temp.push(this.state.followavatar[i]);
              d.push([...temp]);
            }
            this.props.storeFollower(d);
      })
    }).then(() => {
      var userUrl = url + '/headline';
      fetch(userUrl, {method: 'GET', headers: {'Content-Type': 'application/json'}, credentials: 'include'}).then(res => res.json()).then(res => {
        var headline = res["headline"];
        this.setState({headline: headline});
      })
    }).then(() => {
      var profileUrl = url + '/avatar';
      fetch(profileUrl, {method: 'GET', headers: {'Content-Type': 'application/json'}, credentials: 'include'}).then(res => res.json()).then(res => {
        var proAvatar = res["avatar"];
        this.setState({userAvatar: proAvatar});
      })
    });
  }

  handleClick() {
    this.setState({headline: this.state.newHeadline});
    fetch('http://localhost:3000/headline', {method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({headline: this.state.newHeadline}), credentials: 'include'});
  }

  AddFollower() {
    var url = "http://localhost:3000";
    var followUrl = url + '/following/' + this.state.newfollower;
    fetch(followUrl, {method: 'PUT', headers: {'Content-Type': 'application/json'}, credentials: 'include'}).then(res => res.json()).then(res => {
      var followers = res["following"];
      this.setState({allfollower: followers});
      for (var i = 0; i < followers.length; ++i) {
        var headlineUrl = url + '/headline/' + followers[i];
        fetch(headlineUrl, {method: 'GET', headers: {'Content-Type': 'application/json'}, credentials: 'include'}).then(res => res.json()).then(res => {
          var headline = this.state.followheadline;
          headline.push(res["headline"]);
          this.setState({followheadline: headline});
        });
        var avatarUrl = url + '/avatar/' + followers[i];
        fetch(avatarUrl, {method: 'GET', headers: {'Content-Type': 'application/json'}, credentials: 'include'}).then(res => res.json()).then(res => {
          var avatar = this.state.followavatar;
          avatar.push(res["avatar"]);
          this.setState({followavatar: avatar});
        });
      }
    }).then(() => {
      var articleUrl = url + '/articles';
      fetch(articleUrl, {method: 'GET', headers: {'Content-Type': 'application/json'}, credentials: 'include'}).then(res => res.json()).then(res => {
        var c = [];
        for (var i = 0; i < res.length; ++i) {
          var temp = [];
          temp.push(res[i]["author"]);
          temp.push(new Date(res[i]["date"]).toString());
          temp.push(res[i]["text"]);
          temp.push(res[i]["image"]);
          temp.push(new Date(res[i]["date"]).getTime());
          temp.push(res[i]["author"]);
          temp.push(res[i]['comments']);
          temp.push("");
          temp.push("Hide Comments");
          temp.push(res[i]["_id"]);
          c.push([...temp]);
        }
        this.props.storeArticles(c);
      }).then(() => {
        var d = [];
        for (var i = 0; i < this.state.allfollower.length; ++i) {
          var temp = [];
          console.log(this.state.followheadline[i]);
          temp.push(this.state.allfollower[i]);
          temp.push(this.state.followheadline[i]);
          temp.push(this.state.followavatar[i]);
          d.push([...temp]);
        }
        this.props.storeFollower(d);
      });
    })
  }

  LogOut() {
    this.setState({login: false});
    fetch("http://localhost:3000/logout", {method: 'PUT', headers: {'Content-Type': 'application/json'}, credentials: 'include'});
    this.props.history.push('/Landing');
  }

  Profile() {
    this.props.history.push('/Profile');
  }

  handleImageChange(e) {
    var temp = e.target.files[0];
    this.setState({file: temp});
    alert("You have successfully attached image! Try to upload it~")
  }

  handleUpload() {
    const fd = new FormData();
    var file = this.state.file;

    if (file != "") {
      fd.append('text', "");
      fd.append('image', file);
      fetch("http://localhost:3000/avatar", {method: 'PUT', body: fd, credentials: 'include'}).then(res => res.json()).then(res => {
        this.setState({userAvatar: res['avatar']});
        this.setState({file: ""});
      });
    }
    else {
      alert("Please choose image first! ");
    }
  }

  handlePost() {
    var text = this.state.newArticle;
    if (this.state.file != "") {
      const fd = new FormData();
      var file = this.state.file;
      fd.append('text', "");
      fd.append('image', file);
      fetch("http://localhost:3000/image", {method: 'PUT', body: fd, credentials: 'include'}).then(res => res.json()).then(res => {
        var imageUrl = res['image'];
        var payload = {};
        payload['text'] = text;
        payload['image'] = imageUrl;
        var url = "http://localhost:3000";
        var postUrl = url + '/article';
        var getArt = url + '/articles';
        fetch(postUrl, {method: 'POST',
          headers: {'Content-Type': 'application/json', 'Accept': 'application/json',},
          body: JSON.stringify(payload),
          credentials: 'include'}).then(() => {
            fetch(getArt, {method: 'GET', headers: {'Content-Type': 'application/json'}, credentials: 'include'}).then(res => res.json()).then(res => {
              var c = [];
              for (var i = 0; i < res.length; ++i) {
                var temp = [];
                temp.push(res[i]["author"]);
                temp.push(new Date(res[i]["date"]).toString());
                temp.push(res[i]["text"]);
                temp.push(res[i]["image"])
                temp.push(new Date(res[i]["date"]).getTime());
                temp.push(res[i]["author"]);
                temp.push(res[i]["comments"]);
                temp.push("");
                temp.push("Hide Comments");
                temp.push(res[i]['_id']);
                c.push([...temp]);
              }
              this.props.storeArticles(c);
              this.setState({file: ""});
            });
          })
      })
    }
    else {
      var payload = {};
      payload['text'] = text;
      payload['image'] = "";
      var url = "http://localhost:3000";
      var postUrl = url + '/article';
      var getArt = url + '/articles';
      fetch(postUrl, {method: 'POST',
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json',},
        body: JSON.stringify(payload),
        credentials: 'include'}).then(() => {
          fetch(getArt, {method: 'GET', headers: {'Content-Type': 'application/json'}, credentials: 'include'}).then(res => res.json()).then(res => {
            var c = [];
            for (var i = 0; i < res.length; ++i) {
              var temp = [];
              temp.push(res[i]["author"]);
              temp.push(new Date(res[i]["date"]).toString());
              temp.push(res[i]["text"]);
              temp.push(res[i]["image"])
              temp.push(new Date(res[i]["date"]).getTime());
              temp.push(res[i]["author"]);
              temp.push(res[i]["comments"]);
              temp.push("");
              temp.push("Hide Comments");
              temp.push(res[i]['_id']);
              c.push([...temp]);
            }
            this.props.storeArticles(c);
          });
        })
    }
  }

  handleUnfollow(e) {
    var url = 'http://localhost:3000/following/' + e.target.value;
    this.props.unfollow(e.target.value);
    fetch(url, {method: 'DELETE', headers: {'Content-Type': 'application/json'}, credentials: 'include'}).then(() => {
      fetch("http://localhost:3000/articles", {method: 'GET', headers: {'Content-Type': 'application/json'}, credentials: 'include'}).then(res => res.json()).then(res => {
        var c = [];
        for (var i = 0; i < res.length; ++i) {
          var temp = [];
          temp.push(res[i]["author"]);
          temp.push(new Date(res[i]["date"]).toString());
          temp.push(res[i]["text"]);
          temp.push(res[i]["image"])
          temp.push(new Date(res[i]["date"]).getTime());
          temp.push(res[i]["author"]);
          temp.push(res[i]["comments"]);
          temp.push("");
          temp.push("Hide Comments");
          temp.push(res[i]['_id']);
          c.push([...temp]);
        }
        this.props.storeArticles(c);
      });
    });
  }

  handleUpdateArt(e) {
    var temp = e.target.value.split(' ');
    var updatedArt = document.getElementById(temp[1]).innerHTML;
    if (this.props.tempArticle[temp[1]][0] !== this.props.username) {
      window.alert("Can only edit the article of yours!!!")
    }
    else {
      fetch('http://localhost:3000/articles/' + temp[0], {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          text: updatedArt
        }),
        credentials: 'include'});
        window.alert("You have successfully update the message to database! Try to refresh to see changes! ")
    }
  }

  addComments(e) {
    var temp = e.target.value.split(' ');
    var comment = document.getElementById('comments' + temp[1]).value;
    if (comment == "") {

    }
    else {
      var receiver = [...this.props.tempArticle];
      var payload = {commentId: receiver[temp[1]][6].length, text: comment, author: this.props.username};
      receiver[temp[1]][6].push(payload);
      this.props.storeTempArticles(receiver);
      fetch('http://localhost:3000/articles/' + temp[0], {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          text: comment,
          commentId: -1
        }),
        credentials: 'include'});
    }
  }

  handleCommentUpdate(e) {
    var index = e.target.value;
    var receiver = document.getElementsByClassName('comment' + index);
    var id = this.props.tempArticle[index][9];
    for (var i = 0; i < receiver.length; ++i) {
      var temp = receiver[i].innerHTML.split(' ');
      if (this.props.tempArticle[index][6][i]['text'] !== temp[1] && this.props.tempArticle[index][6][i]['author'] === this.props.username) {
        fetch('http://localhost:3000/articles/' + id, {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            text: temp[1],
            commentId: i
          }),
          credentials: 'include'}).then(() => {
            window.alert("You have successfully updated the comment to Database! ");
          });
      }
    }
  }

  render() {
    return (
      <div>
          <div className = "container" id = "profile" style={{overflow : 'auto'}}>
            <button className="btn btn-primary" id = "LogOut" onClick = {this.LogOut}>Log out</button>
            <button className="btn btn-secondary" id = "ProfileBtn" onClick = {this.Profile}>Profile</button>
            <h3>Account Name: {this.props.username}</h3>
            <h4>Headline: {this.state.headline}</h4>
            <input type = "text" className = "form-control" onChange = {(e)=>this.setState({newHeadline: e.target.value})}/>
            <button id = "update" className="btn btn-outline-dark" onClick = {this.handleClick}>Update Headline</button>
            <img id = "userAvatar" src = {this.state.userAvatar}/>
          </div>
          <div className = "container" id = "newart" style={{overflow : 'auto',fontSize: '14px'}}>
            <div className ="md-form amber-textarea active-amber-textarea">
              <i className ="fas fa-pencil-alt prefix"></i>
              <textarea id="textarea" className ="md-textarea form-control" value = {this.state.newArticle} onChange = {(e)=>this.setState({newArticle: e.target.value})}></textarea>
            </div>
            <div className="input-group">
              <div className="custom-file">
                <input type="file" accept="image/*" className="custom-file-input" onChange={(e) => this.handleImageChange(e) }id="inputGroupFile01"aria-describedby="inputGroupFileAddon01"/>
                <label className="custom-file-label">Choose image</label>
              </div>
            </div>
            <button id = "clear" className ="btn btn-danger" onClick = {()=>this.setState({newArticle: ""})}>Clear</button>
            <button id = "postButton" className ="btn btn-primary" onClick = {this.handlePost}>Post</button>
          </div>
          <div className = "container" id = "articles" style={{overflow : 'auto',fontSize: '14px'}}>
            <div>
              <input id = "searchInput" className = "form-control" type = "text" value = {this.state.search} onChange = {(e)=>this.setState({search : e.target.value})}/>
              <button id = "searchButton" className ="btn btn-outline-primary" onClick = {() => this.props.searchArticle(this.state.search)}>Search</button>
            </div>
            {this.props.tempArticle.map((post, index) => (
              <div className = "po" key = {index}>
                  <p>Author: {post[0]}</p>
                  <br/>
                  <p>Date: {post[1]}</p>
                  <br/>
                  <p id = {index} contentEditable = "true">{post[2]}</p>
                  <img src = {post[3]}/>
                  <p>Comments: </p>
                  {post[6].map((comments, id) => (
                    <div className = 'commentContainer' key = {id}>
                      <p className = {"comment" + index} contentEditable = "true">{comments['author']}: {comments['text']}</p>
                    </div>
                  ))}
                  <button className = "btn btn-outline-dark" onClick = {()=>this.props.changeComment(post[4])}>{post[8]}</button>
                  <button className = "btn btn-outline-dark" value = {index} onClick = {(e) => this.handleCommentUpdate(e)}> Update Comment to Datebase! </button>
                  <input id = {'comments' + index} placeholder = "Enter your comment here..." className = "form-control" type = "text"/>
                  <button className = "postButton btn btn-outline-dark" value = {post[9] + " " + index} onClick = {(e) => this.addComments(e)}>Add Comment to Database! </button>
                  <button className = "postButton btn btn-outline-dark" value = {post[9] + " " + index} onClick = {(e) => this.handleUpdateArt(e)}> Update Article to Database! </button>
              </div>
            ))}
          </div>
          <div className = "container" id = "followers" style={{overflow : 'auto',fontSize: '14px'}}>
            <div id = "follower" style={{overflow : 'auto'}}>
                {this.props.followers.map((follower, index) => (
                    <div key = {index}>
                      {follower[0]}
                      <br/>
                      Headline: {follower[1]}
                      <br/>
                      <img src = {follower[2]}/>
                      <br/>
                      <button className = "unfollow" value = {follower[0]} onClick = {(e) => this.handleUnfollow(e)}>Unfollow</button>
                    </div>
                  ))}
            </div>
            <div id = "newuser">
              <input type = "text" value = {this.state.newfollower} onChange = {(e)=>this.setState({newfollower : e.target.value})}/>
              <button onClick = {this.AddFollower}>Add User</button>
            </div>
          </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
      username: state.username,
      loginpass: state.loginpass,
      articles: state.articles,
      tempArticle: state.tempArticle,
      user: state.user,
      userDict: state.userDict,
      followers: state.followers,
      registerF: state.registerF,
      allArticles: state.allArticles
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
      storeArticles: (articles) => dispatch(storeArticles(articles)),
      searchArticle: (search) => dispatch(searchArticle(search)),
      storeUser: (user) => dispatch(storeUser(user)),
      storeDict: (userDict) => dispatch(storeDict(userDict)),
      storeFollower: (followers) => dispatch(storeFollower(followers)),
      unfollow: (follower) => dispatch(unfollow(follower)),
      addFollower: (follower) => dispatch(addFollower(follower)),
      changeUser: (username) => dispatch(changeUser(username)),
      changeLogin: (loginpass) => dispatch(changeLogin(loginpass)),
      addArticle: (newArticle) => dispatch(addArticle(newArticle)),
      storeTempArticles: (allArticles) => dispatch(storeTempArticles(allArticles)),
      changeComment: (id) => dispatch(changeComment(id))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
