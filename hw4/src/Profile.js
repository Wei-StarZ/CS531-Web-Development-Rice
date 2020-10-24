import React from "react";
import {Link, withRouter} from "react-router-dom";
import { connect } from 'react-redux';
import {changePass, changeUser, changeLogin, registFlag, changePhone, changeZip, changeEmail} from './actions'

class Profile extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      phone: "",
      zipcode: "",
      avatar: "https://picsum.photos/200/300?random=" + Math.floor(Math.random()*100 + 1),
      modifiedPass: "",
      newEmail: "",
      newZip: "",
      newPhone: "",
      newName: "",
      newPass: ""
    }
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentDidMount() {
    if (!this.props.registerF) {
      for (var key in this.props.user) {
        if (this.props.user[key][1] == window.localStorage.getItem("username")) {
          window.localStorage.setItem("username", this.props.user[key][1]);
          window.localStorage.setItem("zipcode", this.props.user[key][5].substring(0,5));
          window.localStorage.setItem("phone", this.props.user[key][6].substring(2,15));
          window.localStorage.setItem("email", this.props.user[key][4]);

        }
      }
    if (this.props.loginpass != "") {
      window.localStorage.setItem("modifiedPass", this.props.loginpass);
    }
      var temp = ""
      for (var i = 0; i < window.localStorage.getItem("modifiedPass").length; ++i) {
        temp = temp + "*";
      }
      this.setState({modifiedPass: temp});
      this.setState({email: window.localStorage.getItem("email")});
      this.setState({phone: window.localStorage.getItem("phone")});
      this.setState({zipcode: window.localStorage.getItem("zipcode")});
      this.setState({username: window.localStorage.getItem("username")});
    }
    else {
      if (this.props.username != "") {
        window.localStorage.setItem("username", this.props.username);
      }
      if (this.props.email != "") {
        window.localStorage.setItem("email", this.props.email);
      }
      if (this.props.phone != "") {
        window.localStorage.setItem("phone", this.props.phone);
      }
      if (this.props.zipcode != "") {
        window.localStorage.setItem("zipcode", this.props.zipcode);
      }
      if (this.props.password != "") {
        window.localStorage.setItem("password", this.props.password);
      }
      this.setState({username: window.localStorage.getItem("username")});
      this.setState({email: window.localStorage.getItem("email")});
      this.setState({phone: window.localStorage.getItem("phone")});
      this.setState({zipcode: window.localStorage.getItem("zipcode")});
      var temp = ""
      for (var i = 0; i < window.localStorage.getItem("password").length; ++i) {
        temp = temp + "*";
      }
      this.setState({modifiedPass: temp});
    }
  }

  handleUpdate(){
    if (this.state.newZip != "" && this.state.newZip != this.state.zipcode) {
      var flag = true;
      if (this.state.newZip.length != 5) {
        flag = false;
      }
      for (var i = 0; i < this.state.newZip.length; ++i) {
        if (isNaN(this.state.newZip.charAt(i))) {
          flag = false;
        }
      }
      if (flag) {
        this.setState({zipcode: this.state.newZip});
      }
      else {
        window.alert("Please enter 5-digot number! ");
      }
    }
    if (this.state.newEmail != "" && this.state.newEmail != this.state.email) {
      var flag = true;
      var flag2 = false;
      for (var i = 0; i < this.state.newEmail.length; ++i) {
        if (flag == false) {
          flag = true;
        }
        if (flag && this.state.newEmail.charAt(i) == '@' && i != 0) {
          flag = false;
          flag2 = true;
        }
      }
      if (flag && flag2) {
        this.setState({email: this.state.newEmail});
      }
      else {
        window.alert("Please enter valid e-mail: name@address! ");
      }
    }
    if (this.state.newPhone != "" && this.state.newPhone != this.state.phone) {
      var flag = true;
      if (this.state.newPhone.length != 12) {
        flag = false;
      }
      for (var i = 0; i < this.state.newPhone.length; ++i) {
        if (i == 3 || i == 7) {
          if (this.state.newPhone.charAt(i) != '-') {
            flag = false;
          }
        }
        else {
          if (isNaN(this.state.newPhone.charAt(i))){
            flag = false;
          }
        }
      }
      if (flag) {
        this.setState({phone: this.state.newPhone});
      }
      else {
        window.alert("Please match the format: 123-123-1234! ");
      }
    }
    if (this.state.newName != "" && this.state.newName != this.state.username) {
      var flag1 = true;
      for (var i = 0; i < this.state.newName.length; ++i) {
        if (this.state.newName.charAt(i) >= '0' && this.state.newName.charAt(i) <= '9' && i == 0) {
          flag1 = false;
          break;
        }
        if (this.state.newName.charAt(i).toLowerCase() == this.state.newName.charAt(i).toUpperCase() && isNaN(this.state.newName.charAt(i))) {
          flag1 = false;
          break;
        }
      }
      if (flag1) {
        this.setState({username: this.state.newName});
      }
      else {
        window.alert("Please start with a letter and do not enter special character! ");
      }
    }
    if (!this.props.registerF) {
      if (this.state.newPass != "" && this.state.newPass != this.props.loginpass) {
        this.props.changeLogin(this.state.newPass);
        var temp = ""
        for (var i = 0; i < this.state.newPass.length; ++i) {
          temp = temp + "*";
        }
        this.setState({modifiedPass: temp});
      }
    }
    else {
      if (this.state.newPass != "" && this.state.newPass != this.props.password) {
        this.props.changePass(this.state.newPass);
        var temp = ""
        for (var i = 0; i < this.state.newPass.length; ++i) {
          temp = temp + "*";
        }
        this.setState({modifiedPass: temp});
      }
    }
  }

  render() {
    return (
      <div>
        <Link to="/Main">Main Page</Link>
        <br/>
        <div>
          <p>Current Information: </p>
          <p>User Name: {this.state.username}</p>
          <p>E-mail: {this.state.email}</p>
          <p>Phone: {this.state.phone}</p>
          <p>Zipcode: {this.state.zipcode}</p>
          <p>Password: {this.state.modifiedPass}</p>
          <img src = {this.state.avatar}/>
          <p>Update Avatar</p>
          <input type = "file"/>
        </div>
        <div>
          <p>Update Info</p>
          <p>Name: </p><input type = "text" pattern = "[a-zA-Z0-9]+" onChange = {(e)=>this.setState({newName: e.target.value})}></input>
          <p>Email: </p><input type = "email" onChange = {(e)=>this.setState({newEmail: e.target.value})}></input>
          <p>Phone: </p><input type = "tel" pattern = "[0-9]{3}-[0-9]{3}-[0-9]{4}" onChange = {(e)=>this.setState({newPhone: e.target.value})}></input>
          <p>Zipcode: </p><input type = "zip" pattern = "[0-9]{5}" onChange = {(e)=>this.setState({newZip: e.target.value})}></input>
          <p>Password: </p><input type = "password" onChange = {(e)=>this.setState({newPass: e.target.value})}></input>
          <button onClick = {this.handleUpdate}>Update! Now! </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
      user: state.user,
      registerF: state.registerF,
      username: state.username,
      loginpass: state.loginpass,
      password: state.password,
      zipcode: state.zipcode,
      phone: state.phone,
      email: state.email
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
      changeZip: (zipcode) => dispatch(changeZip(zipcode)),
      changePhone: (phone) => dispatch(changePhone(phone)),
      changeEmail: (email) => dispatch(changeEmail(email)),
      changeUser: (username) => dispatch(changeUser(username)),
      changeLogin: (loginpass) => dispatch(changeLogin(loginpass)),
      changePass: (password) => dispatch(changePass(password))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
