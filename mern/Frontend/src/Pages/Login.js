import React, { Component,useEffect,useState } from "react";
import axios from "axios";
import { baseurl} from './helper'
import { response } from "express";

const initialDetails = {
  name: "",
  password: "",
};


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {...initialDetails};
    this.setState = this.setState.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.loginRequest = this.loginRequest.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }
  // const history = useHistory();
  
    //onMounting token stored in localStorage should be removed
  componentDidMount(){
    localStorage.removeItem("token");
  }

  handleChange = (e) => {
    const {name,value} = e.target;
    //code goes here to handle onChange event for input fields
    this.setState(prev => ({...prev,[name] : value}));
  };

  loginRequest = async () => {
    //code goes here to return the response after hitting login api
    await fetch("/api/admin/login",{
        method : "post",
        body   : JSON.stringify({...this.state}),
        headers: {
          "Content-type"  : "application/json; charset=UTF-8"
        },
      }).then((response) => {
        if(response.data?.token){
          localStorage.setItem("token",response.data?.token);
          this.props.history?.push("/");
        }
      }).catch((error) => {
        alert("Invalid Credentials");
      })
  };

  handleLogin = async () => {
    if(this.state.name.length > 2 && this.state.password.length > 2 ){
      await this.loginRequest();
    }
    else 
      alert("Invalid Credentials");
     //handles login button
    //based on the login response, token should be set in local storage or alert should be displayed
  };

  render(){
    return (
      <div className="login">
        <h1>Login</h1>
        <input name="name" placeholder="Name" value={this.state.name} onChange={(e)=> this.handleChange(e)} type="text"/>
        <input name="password" placeholder="Password" value={this.state.password} onChange={(e) => this.handleChange(e)} type="password"/>
        <button disabled={!(this.state.name && this.state.password)} onClick={()=>this.handleLogin()}>
          Login
        </button>
      </div>
    );
  }
}

export default Login;
