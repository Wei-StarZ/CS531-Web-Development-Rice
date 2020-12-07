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
      avatar: "",
      modifiedPass: "************",
      newEmail: "",
      newZip: "",
      newPhone: "",
      newName: "",
      newPass: "",
      file: ""
    }
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentDidMount() {
    var url = 'http://localhost:3000/'
    fetch(url+'email', {method: 'GET',
    headers: {'Content-Type': 'application/json'},
    credentials: 'include'}).then(res => res.json()).then(res => {
      this.setState({username: res['username'], email: res['email']});
    });
    fetch(url+'zipcode', {method: 'GET',
    headers: {'Content-Type': 'application/json'},
    credentials: 'include'}).then(res => res.json()).then(res => {
      this.setState({zipcode: res['zipcode']});
    });
    fetch(url+'avatar', {method: 'GET',
    headers: {'Content-Type': 'application/json'},
    credentials: 'include'}).then(res => res.json()).then(res => {
      this.setState({avatar: res['avatar']});
    });
  }

  handleUpdate(){
    var url = 'http://localhost:3000/'
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
        fetch(url+'zipcode', {method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          zipcode: this.state.newZip
        }),
        credentials: 'include'}).then(res => res.json()).then(res => {
          this.setState({zipcode: res['zipcode']});
        });
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
        fetch(url+'email', {method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: this.state.newEmail
        }),
        credentials: 'include'}).then(res => res.json()).then(res => {
          this.setState({email: res['email']});
        });
      }
      else {
        window.alert("Please enter valid e-mail: name@address! ");
      }
    }
    if (this.state.newPass != this.props.loginpass && this.state.newPass != "") {
      fetch(url+'password', {method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        password: this.state.newPass
      }),
      credentials: 'include'});
      this.props.changeLogin(this.state.newPass);
      var temp = "";
      for (var i = 0; i < this.state.newPass.length; ++i) {
        temp += "*";
      }
      this.setState({modifiedPass: temp});
    }
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
        this.setState({avatar: res['avatar']});
        this.setState({file: ""});
      });
    }
    else {
      alert("Please choose image first! ");
    }
  }

  render() {
    return (
      <div>
        <Link to="/Main">Main Page</Link>
        <br/>
        <div>
          <div className = "container" id = "personInfo" style = {{overflow : 'auto',fontSize: '25px'}}>
            <p>Current Information: </p>
            <br/>
            <p>User Name: {this.state.username}</p>
            <p>E-mail: {this.state.email}</p>
            <p>Phone: {this.state.phone}</p>
            <p>Zipcode: {this.state.zipcode}</p>
            <p>Password: {this.state.modifiedPass}</p>
          </div>
          <div className = "container" id = "personAvatar">
            <img src = {this.state.avatar} id = "profileAvatar"/>
            <br/>
            <div className="input-group" id = "updateAvatarDiv">
              <div className="custom-file">
                <br/>
                <input type="file" accept="image/*" className="custom-file-input" onChange={(e) => this.handleImageChange(e) }id="inputGroupFile01"aria-describedby="inputGroupFileAddon01"/>
                <label className="custom-file-label">Choose image</label>
                <button className = "btn btn-secondary" id = "updateAvatarBtn" onClick = {this.handleUpload}>Update Your Avatar!</button>
              </div>
            </div>
            <br/>
          </div>
        </div>
        <div className = "container" id = "updateProfile" style = {{overflow : 'auto',fontSize: '14px'}}>
          <p>Update Info</p>
          <p>Email: </p><input type = "email" onChange = {(e)=>this.setState({newEmail: e.target.value})}></input>
          <p>Zipcode: </p><input type = "zip" pattern = "[0-9]{5}" onChange = {(e)=>this.setState({newZip: e.target.value})}></input>
          <p>Password: </p><input type = "password" onChange = {(e)=>this.setState({newPass: e.target.value})}></input>
          <br/>
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
