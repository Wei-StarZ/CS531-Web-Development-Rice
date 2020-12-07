import React from "react";
import {Link, withRouter} from "react-router-dom";
import { connect } from 'react-redux';
import {changePass, changeUser, changeLogin, registFlag, changePhone, changeZip, changeEmail, storeUser, storeDict} from './actions';
class Landing extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      accountName: "",
      confirmedPass: "",
      registerPass: "",
      time: new Date(),
      birthdate: new Date(),
      login: false,
      zip: "",
      phone: "",
      mail: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.facebook = this.facebook.bind(this);
  }

  componentDidMount() {

  }

  registerHandler = (e) => {
    e.preventDefault();
    var flag = true;
    var birthday = new Date(this.state.birthdate);
    var difference = (this.state.time.getTime() - birthday.getTime())/(1000*24*3600*365);
    if (this.state.registerPass != this.state.confirmedPass) {
      flag = false;
      alert("Please match the password you just entered!");
    }
    if (difference < 18) {
      flag = false;
      alert("Age must be greater than 18 years old");
    }
    if (flag){
      fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: this.state.accountName,
          password: this.state.registerPass,
          dob: birthday,
          email: this.state.mail,
          zipcode: this.state.zip
        }),
        credentials: 'include'
      }).then(res => {
        alert('You have registered new account!!! Try Log In');
      });
    }
    else {
      alert('Failed to register!!!');
    }
  }

  loginHandler = (e) => {
    e.preventDefault();
    if (this.props.username == "" || this.props.loginpass == "") {
      if (this.props.username == "") {
        window.alert("Please enter username to login! ");
      }
      if (this.props.loginpass == "") {
        window.alert("Please enter password to login! ");
      }
    }
    else {
        fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: this.props.username,
            password: this.props.loginpass,
          }),
          credentials: 'include'
        }).then(res => {
          if (res.ok) {
            return res.json();
          }
          else {
            window.alert("Incorrect login!!!");
          }
        }).then(res => {
          if (res != null && res['result'] == 'success') {
            this.props.history.push('/Main');
          }
        });
    }
  }

  facebook(){
    fetch('http://localhost:3000/auth/facebook', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    })
  }

  handleChange(e){
    this.setState({registerPass: e.target.value});
    this.props.changePass(e.target.value);
  }
  render() {
    return(
      <div id = "landingbody">
        <img class = "rice" src = "https://lh3.googleusercontent.com/pERvUPU-m9MEKdudMYK67Ougp_FEOuf9N4A-XZ44GpFzXub4NxhlNA-yQdKzHHQQpIYLhIADQ-pl0pIRk_6Ylt-o3QZY_R54BnBM_CTRnVuTIDgGPelQgD5jD3aODBoEis0wb78H=s240-p-k"/>
        <h1 id = "welcome">Welcome to Rice Book!!!</h1>
        <div class = "container" id = "registerDiv" style={{overflow : 'auto'}}>
        <form role = "form" id = "register" onSubmit = {this.registerHandler}>
        <h1>Register</h1>
        <div class="form-group">
          <label for="account name">Account Name: </label>
          <input type = "text" class = "form-control" placeholder = "Enter Account Name Here" name = "Account Name" id = "account" pattern = "[a-zA-Z0-9]+" value = {this.state.accountName} onChange = {(e)=>this.setState({accountName: e.target.value})}></input>
        </div>
        <div class="form-group">
          <label for="Email Address">E-mail Address: </label>
          <input type = "email" class = "form-control" placeholder = "x@x.com" name = "E-mail" onChange = {(e)=>this.setState({mail: e.target.value})}required></input>
        </div>
        <div class="form-group">
          <label for="Phone Number">Phone Number: </label>
          <input type = "tel" class = "form-control" placeholder = "xxx-xxx-xxxx" name = "phone" placeholder = "123-123-1234" pattern = "[0-9]{3}-[0-9]{3}-[0-9]{4}" onChange = {(e)=>this.setState({phone: e.target.value})} required></input>
        </div>
        <div class="form-group">
          <label for="Birthday">Birthday: </label>
          <input type = "date" class = "form-control" name = "Birthdate" value = {this.state.birthdate} onChange = {(e) => this.setState({birthdate: e.target.value})}required></input>
        </div>
        <div class="form-group">
          <label for="Zipcode">Zipcode: </label>
          <input type = "zip" class = "form-control" placeholder = "xxxxx" name = "zip" pattern = "[0-9]{5}" onChange = {(e)=>this.setState({zip: e.target.value})}></input>
        </div>
        <div class="form-group">
          <label for="password">Password: </label>
          <input type = "password" class = "form-control" name = "password" value = {this.state.registerPass} onChange = {this.handleChange} required></input>
        </div>
        <div class="form-group">
          <label for="confirmed password">Password Confirmation: </label>
          <input type = "password" class = "form-control" name = "password" value = {this.state.confirmedPass} onChange = {(e) => this.setState({confirmedPass: e.target.value})} required></input>
        </div>
        <button type="submit" class="btn btn-primary">Register</button>
        </form>
        </div>
        <div class = "container" id = "loginDiv" style={{overflow : 'auto'}}>
        <form id = "login" onSubmit = {this.loginHandler}>
        <h1>Log In</h1>
        <div class="form-group">
          <label for="Username">Username: </label>
          <input type = "text" class = "form-control" placeholder = "Enter your account name" value = {this.props.username} onChange = {(e) => this.props.changeUser(e.target.value)}/>
        </div>
        <div class="form-group">
          <label for="Password">Password: </label>
          <input type = "password" class = "form-control" placeholder = "Enter your password" value = {this.props.loginpass} onChange = {(e) => this.props.changeLogin(e.target.value)}/>
        </div>
        <button type="submit" class="btn btn-primary">Log In</button>
        </form>
        <a href = {"http://localhost:3000" + "/auth/facebook"}>Login in with facebook</a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
      username: state.username,
      password: state.password,
      loginpass: state.loginpass,
      user: state.user
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
      changePass: (password) => dispatch(changePass(password)),
      changeUser: (username) => dispatch(changeUser(username)),
      changeLogin: (loginpass) => dispatch(changeLogin(loginpass)),
      changeZip: (zipcode) => dispatch(changeZip(zipcode)),
      changePhone: (phone) => dispatch(changePhone(phone)),
      changeEmail: (email) => dispatch(changeEmail(email)),
      registFlag: (registerF) => dispatch(registFlag(registerF)),
      storeUser: (user) => dispatch(storeUser(user)),
      storeDict: (userDict) => dispatch(storeDict(userDict))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Landing));
