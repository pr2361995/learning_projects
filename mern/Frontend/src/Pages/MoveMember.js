import React, { Component, useState,useEffect } from "react";
import Header from "../Components/Header";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { validation, baseurl } from "./helper";

const instance = axios.create({
  baseURL : baseurl,
  withCredentials: true,
  headers: {Authorization : `Bearer ${localStorage.getItem("token")}`}
});

class MoveMember extends Component {
  // const history = useHistory();
  constructor(props) {
    super(props);
    this.state = {
      teams: [],
      data: [],
      empId: "",
      to:"",
      from:"",
      errorStmtEmpId: "",
    };
    this.setState = this.setState.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getLocalStorage = this.getLocalStorage.bind(this);
    this.fetchData = this.fetchData.bind(this);

    this.handleGetTeam = this.handleGetTeam.bind(this);
    this.handleGetMembers  = this.handleGetMembers.bind(this);
    this.handleClear = this.handleClear.bind(this);

    this.MoveRequest = this.MoveRequest.bind(this);
    this.handleMove = this.handleMove.bind(this);
  }

  //onMounting
    //if local storage had token proceed to set data in state
    //if local storage does not have token route back to login page
    //code goes here to set value returned from handleGetTeam and handleGetMembers to state teams and data
  async componentDidMount(){
    if(!this.getLocalStorage())
      this.props.history?.push("/login")
    else
      await this.fetchData();
  }
  
  fetchData = async () => {
    const techs = await this.handleGetTeam();
    const members = await this.handleGetMembers("/api/tracker/members/display");
    this.setState(prev => ({...prev,teams:techs,data:members}));
  }

  getLocalStorage = () => {
    //code goes here to get and return token value from local storage
    return localStorage.getItem("token");
  };

  handleGetTeam = async () => {
    //code goes here to return the respose of technologies get api
    try {
      const members =  await instance.get("/api/tracker/technologies/get")
      return members.data;
    }catch(e){
      alert("error "+ e.toString()) 
    }
  };

  handleGetMembers = async (url) => {
    //code goes here to return the response of api that is used to getMember 
    try {
      const members =  await feth(url,{
        headers : {
            "Authorization" : `Bearer ${this.getLocalStorage()}`,
        }
      })
      return members.data;
    }catch(e){
      alert("error "+ e.toString()) 
    }
  };

  handleChange = (e) => {
    //code goes here to handle onChange for select and input fields
    const {name,value} = e.target;
    const errV = validation(name,value);
    if(errV){
      this.setState(prev => ({...prev,[name]:value,errorStmtEmpId:errV}))
    }else
      this.setState(prev => ({...prev,[name]:value,errorStmtEmpId:""}))
    e.preventDefault;
  };

  handleClear = () => {
    //code goes here to handle clear button
    this.setState(prev => ({...prev,empId:"",to:"",from:""}));
  };

  MoveRequest = async (id) => {
    const {to:technology_name} = this.state
    //code goes here to return the response status code of api that is used to move members from one team to another
    const updateDetails = await fetch(`/api/tracker/members/update/${id}`,{
      method:"PATCH",
      body: JSON.stringify({technology_name}),
      headers :{
        "Authorization" : `Bearer ${this.getLocalStorage()}`,
        "Content-type": "application/json; charset=UTF-8",
      }
    })
    return updateDetails;
  };

  handleMove = async (e) => {
    //code goes here to handle move button
    const curentMem = this.state.data?.find(mem => mem.employee_id == this.state.empId);
    if(curentMem && curentMem.technology_name != this.state.to){
      const resp = await this.MoveRequest(curentMem._id);
    }
    e.preventDefault;
  };


  render(){
    return (
      <>
        <Header />
        <form className="MoveMember">
          <h1>Move Team Member</h1>
        <input placeholder="Employee Id" onChange={this.handleChange} name="empId" value={this.state.empId}/>
        <span>{this.state.errorStmtEmpId}</span>
        {/*use sapn to display error msg*/}
          <div className="fromTo">
            {/*code goes here for from and to labels and input fields*/}
            from <select name="from" onChange={this.handleChange} value={this.state.from} >
            <option>--select team--</option>
            {
              this.state.teams.map(tm => <option key={tm._id} selected={this.state.from == tm.name}  value={tm.name}>{tm.name}</option>)
            }
            </select>
            to <select name="to" onChange={this.handleChange} value={this.state.to} >
            <option value="" disabled={true} selected>--select team--</option>
            {
              this.state.teams.map(tm => <option key={tm._id} selected={this.state.to === tm.name}  value={tm.name}>{tm.name}</option>)
            }
            </select>
          </div>
          <div className="row3">
            <button className="add" disabled={!(this.state.errorStmtEmpId.length <= 0 && this.state.empId.length > 0 && this.state.to.length > 0)} onClick={(e) => this.handleMove(e)}>
              Move
            </button>
            <button className="add" onClick={() => this.handleClear()}>
              Clear
            </button>
          </div>
        </form>
      </>
    );
  }
}
export default MoveMember;
