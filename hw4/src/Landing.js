import React from "react";
import {Link, withRouter} from "react-router-dom";
import { connect } from 'react-redux';
import {changePass, changeUser, changeLogin, registFlag, changePhone, changeZip, changeEmail} from './actions'

class Landing extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      accountName: "",
      confirmedPass: "",
      registerPass: "",
      time: new Date(),
      birthdate: new Date(),
      zip: "",
      phone: "",
      mail: ""
    }
    this.handleChange = this.handleChange.bind(this);
  }

  registerHandler = (e) => {
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
      this.props.registFlag(true);
      this.props.changeEmail(this.state.mail);
      this.props.changePhone(this.state.phone);
      this.props.changeZip(this.state.zip);
      this.props.changeUser(this.state.accountName);
      this.props.history.push('/Main');
    }
  }

  loginHandler = (e) => {
    if (this.props.loginpass != "" && this.props.username != "") {
      this.props.history.push('/Main');
    }
    else {
      if (this.props.loginpass == "") {
        window.alert("Please enter password to login! ");
      }
      else {
        window.alert("Please enter username to login! ");
      }
    }
  }

  handleChange(e){
    this.setState({registerPass: e.target.value});
    this.props.changePass(e.target.value);
  }
  render() {
    return(
      <div>
        <table>
        <tr>
        <td>
        <form id = "register" onSubmit = {this.registerHandler}>
        <p>Account Name: </p><input type = "text" name = "Account Name" id = "account" pattern = "[a-zA-Z0-9]+" value = {this.state.accountName} onChange = {(e)=>this.setState({accountName: e.target.value})}></input>
        <p>E-mail Address: </p><input type = "email" name = "E-mail" onChange = {(e)=>this.setState({mail: e.target.value})}required></input>
        <p>Phone Number: </p><input type = "tel" name = "phone" placeholder = "123-123-1234" pattern = "[0-9]{3}-[0-9]{3}-[0-9]{4}" onChange = {(e)=>this.setState({phone: e.target.value})} required></input>
        <p>Birthday: </p><input type = "date" name = "Birthdate" value = {this.state.birthdate} onChange = {(e) => this.setState({birthdate: e.target.value})}required></input>
        <p>Zipcode: </p><input type = "zip" name = "zip" pattern = "[0-9]{5}" onChange = {(e)=>this.setState({zip: e.target.value})}></input>
        <p>Password: </p><input type = "password" name = "password" value = {this.state.registerPass} onChange = {this.handleChange} required></input>
        <p>Password Confirmation: </p><input type = "password" name = "password" value = {this.state.confirmedPass} onChange = {(e) => this.setState({confirmedPass: e.target.value})} required></input>
        <br>
        </br>
        <input type = "submit" value = "Register"></input>
        </form>
        </td>
        <td>
        <form id = "login" onSubmit = {this.loginHandler}>
        <p>log in</p>
        <p>Username</p><input type = "text" value = {this.props.username} onChange = {(e) => this.props.changeUser(e.target.value)}/>
        <p>Password</p><input type = "password" value = {this.props.loginpass} onChange = {(e) => this.props.changeLogin(e.target.value)}/>
        <br/>
        <input type = "submit" value = "Login"></input>
        </form>
        </td>
        </tr>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
      username: state.username,
      password: state.password,
      loginpass: state.loginpass
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

    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Landing));
