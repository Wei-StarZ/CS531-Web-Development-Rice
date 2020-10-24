import React from "react";
import {Link} from "react-router-dom";
import { connect } from 'react-redux';
import {storeArticles, searchArticle, storeUser, storeDict, storeFollower, unfollow, addArticle, addFollower, changeUser, changeLogin} from './actions';

class Main extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      headline: "I love react! ",
      newHeadline: "",
      newfollower: "",
      newArticle: ""
    }
  }

  componentDidMount() {
      if (window.localStorage.getItem('username') == "" ||this.props.username != "") {
        window.localStorage.setItem('username', this.props.username);
      }
      else {
        if (this.props.username == "") {
          this.props.changeUser(window.localStorage.getItem('username'));
        }
      }
      if (window.localStorage.getItem('loginpass') == "" ||this.props.loginpass != "") {
        window.localStorage.setItem('loginpass', this.props.loginpass);
      }
      else {
        if (this.props.loginpass == "") {
          this.props.changeLogin(window.localStorage.getItem('loginpass'));
        }
      }
      fetch(`https://jsonplaceholder.typicode.com/users`).then(res => res.json()).then(res => {
        var c = {};
        var userDict = {};
        for (var i = 0; i < res.length; ++i) {
          var temp1 = [];
          var img = "https://picsum.photos/200/300?random=" + 1 + i;
          temp1.push(res[i]["name"]);
          temp1.push(res[i]["username"]);
          temp1.push(res[i]["address"]["street"]);
          temp1.push(res[i]["company"]["catchPhrase"]);
          temp1.push(res[i]["email"]);
          temp1.push(res[i]["address"]["zipcode"]);
          temp1.push(res[i]["phone"]);
          temp1.push(img);
          c[res[i]["id"]] = [...temp1];
          userDict[res[i]["username"]] = res[i]["company"]["catchPhrase"];
        }
        this.props.storeUser(c);
        this.props.storeDict(userDict);
      }).then(res => {
        fetch(`https://jsonplaceholder.typicode.com/posts`).then(res => res.json()).then(res => {
          var b = [];
          var multi = 10000;
          var flag = true;
          for (var i = 0; i < res.length; ++i) {
            if (this.props.user[res[i]["userId"]][1] == this.props.username &&
          this.props.user[res[i]["userId"]][2] == this.props.loginpass){
              var temp = [];
              var date = 1602300000000 - i*50000000000;
              var time = new Date(date).toUTCString();
              temp.push(this.props.user[res[i]["userId"]][0]);
              temp.push(time);
              temp.push(res[i]["body"]);
              if (i % 10 <= 2) {
                var receiver = "https://picsum.photos/200/300?random=" + i;
                temp.push(receiver);
              }
              else {
                temp.push("");
              }
              temp.push(date);
              b.push([...temp]);
            }
          }
          if (b.length == 0) {
            flag = false;
            for (var i = 0; i < 10; ++i) {
              var temp = [];
              var date = 1602300000000 - i*50000000000;
              var time = new Date(date).toUTCString();
              temp.push(this.props.user[res[Math.floor(Math.random() * 98)]["userId"]][0]);
              temp.push(time);
              temp.push(res[Math.floor(Math.random() * 98)]["body"]);
              if (i % 10 <= 2) {
                var receiver = "https://picsum.photos/200/300?random=" + i;
                temp.push(receiver);
              }
              else {
                temp.push("");
              }
              temp.push(date);
              b.push([...temp]);
            }
          }
          this.props.storeArticles(b);
          if (flag) {
            this.setState({headline: this.props.userDict[this.props.username]});
          }
          }
        );
      }).then(res => {
        var d = [];
        var user = this.props.username;
        for (var key in this.props.user) {
          if (this.props.user[key][1] == user) {
            var value = parseInt(key);
            for (var i = 0; i < 3; ++i) {
              var temp = [];
              var imgTemp = "https://picsum.photos/200/300?random=" + value + i + 1;
              temp.push(this.props.user[(value + i + 1)%10][0]);
              temp.push(this.props.user[(value + i + 1)%10][3]);
              temp.push(imgTemp);
              d.push([...temp]);
            }
          }
        }
        if (d.length == 0) {
          for (var i = 1; i < 4; ++i) {
            var temp = [];
            var imgTemp = "https://picsum.photos/200/300?random=" + Math.floor(Math.random() * 100 + 1);
            temp.push(this.props.user[i][0]);
            temp.push(this.props.user[i][3]);
            temp.push(imgTemp);
            d.push([...temp]);
          }
        }
        this.props.storeFollower(d);
      });
  }

  render() {
    return (
      <div>
          <Link id = "Log" to={"/Landing"}>Log Out</Link>
          <br/>
          <Link id = "Profile" to={"/Profile"}>Profile</Link>
          <p>{this.props.username}</p>
          <p>Headline: {this.state.headline}</p>
          <br/>
          <input type = "text" onChange = {(e)=>this.setState({newHeadline: e.target.value})}/>
          <button onClick = {()=>{this.setState({headline: this.state.newHeadline})}}>Update</button>
          <br/>
          <img src = "https://picsum.photos/200/300?random=150"/>
          <br/>
          <input type = "file"/>
          <textarea id = "textarea" value = {this.state.newArticle} onChange = {(e)=>this.setState({newArticle: e.target.value})}></textarea>
          <button id = "clear" onClick = {()=>this.setState({newArticle: ""})}>Clear</button>
          <button id = "postButton" onClick = {()=>this.props.addArticle(this.state.newArticle)}>Post</button>
          <div>
            <input id = "searchInput" type = "text" value = {this.state.search} onChange = {(e)=>this.setState({search : e.target.value})}/>
            <button id = "searchButton" onClick = {() => this.props.searchArticle(this.state.search)}>Search</button>
          </div>
          <div id = "articles" style={{overflowX : 'auto',fontSize: '14px'}}>
            <table id = "post">
              <tr>
                {this.props.tempArticle.map((post, index) => (
                  <td className = "po" key = {index}>
                    <div>
                      <p>Author: {post[0]}</p>
                      <br/>
                      <p>Date: {post[1]}</p>
                      <br/>
                      {post[2]}
                      <br/>
                      <img src = {post[3]}/>
                      <br/>
                      <br/>
                      <button class = "postButton"> Comment </button>
                      <button class = "postButton"> Edit </button>
                    </div>
                  </td>
                ))}
              </tr>
            </table>
          </div>
          <div style={{overflowY : 'auto'}}>
            <table class = "follow">
              {this.props.followers.map((follower, index) => (
                <tr>
                  <td class = "followTd">
                    <div>
                      {follower[0]}
                      <br/>
                      Headline: {follower[1]}
                      <br/>
                      <img src = {follower[2]}/>
                      <br/>
                      <button class = "unfollow" onClick = {() => this.props.unfollow(follower[0])}>Unfollow</button>
                    </div>
                  </td>
                </tr>
              ))}
            </table>
          </div>
          <div>
            <input type = "text" value = {this.state.newfollower} onChange = {(e)=>this.setState({newfollower : e.target.value})}/>
            <button onClick = {() => this.props.addFollower(this.state.newfollower)}>Add New Follower</button>
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
      registerF: state.registerF
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
      addArticle: (newArticle) => dispatch(addArticle(newArticle))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
