import React, { Component, useEffect, useState } from "react";
import Header from "../Components/Header";
import remove from "../icon/close.png";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { validation,baseurl } from "./helper";

const instance = axios.create({
  baseURL : baseurl,
  withCredentials: true,
  headers: {Authorization : `Bearer ${localStorage.getItem("token")}`}
});

class AddMember extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      empId: "",
      empName: "",
      teamName: "",
      experience: "",
      newTeam: "",
      createTeam: false,
      deleteTeam: false,
      teams: [],
      errorStmtEmpId: "",
      errorStmtEmpName: "",
      errorStmtExperience: "",
    });
    this.setState = this.setState.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getLocalStorage = this.getLocalStorage.bind(this);
    this.fetchData = this.fetchData.bind(this);

    this.handleGetTeam = this.handleGetTeam.bind(this);
    this.handleAddMember = this.handleAddMember.bind(this);
    this.AddRequest = this.AddRequest.bind(this);
    this.handleAddOrDeleteTeam = this.handleAddOrDeleteTeam.bind(this);
    // this.handleClear = this.handleClear.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSave = this.handleSave.bind(this);

    this.saveTeam = this.saveTeam.bind(this);
    this.handleRemoveTeam = this.handleRemoveTeam.bind(this);
    // this.removeTeamRequest = this.removeTeamRequest.bind(this);
  }
  

  fetchData = async () => {
    const techs = await this.handleGetTeam();
    if(techs.length > 0)
      this.setState(prev => ({...prev,teams:techs}));
  }

  async componentDidMount(){
    if(!this.getLocalStorage())
      this.props.history?.push("/login")
    else 
      await this.fetchData();
  }

  //onMounting
    //if local storage had token proceed to set data in state
    //if local storage does not have token route back to login page
    //code goes here to set value returned from handleGetTeam to teams state

  getLocalStorage = () => {
    //code goes here to get token value from local storage
    return localStorage.getItem("token");
  };

  handleGetTeam = async () => {
    //code goes here to return the respose of technologies get api
    try {
      
      const members =  await fetch("/api/tracker/technologies/get",{
        headers: {
          "Authorization" : `Bearer ${this.getLocalStorage()}`,
        },
      });
      return members.data;
    }catch(e){
      alert("error "+ e.toString()) 
    }
  };

  handleChange = (e) => {
    const {name,value} = e.target;
    const errV = validation(name,value);
    this.setState((prev) => ({...prev,[name]:value,[name === "empId" ? "errorStmtEmpId" : (name === "empName" ? "errorStmtEmpName" : "errorStmtExperience")]: errV ? errV : ""}))
    //code goes here to handle onChange event
    e.preventDefault;
  };

  handleAddMember = async (e) => {
    //code goes here to handle add member button using the return value of AddRequest
    const resp =  await this.AddRequest();
    if(Object.keys(resp).length > 0){
      this.handleClear();
    }
    e.preventDefault();
  };

  AddRequest = async () => {
    const {empId:employee_id,empName:employee_name,teamName:technology_name,experience} = this.state;
    //code goes here to return the response status of add member api
    
    const res = await fetch("/api/tracker/members/add",{
      method : "post",
      body   : JSON.stringify({employee_id,employee_name,technology_name,experience}),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization" : `Bearer ${this.getLocalStorage()}`,
      },
    });
    return res.data;
  };

  handleClear = () => {
    //code goes here to handle clear button
    this.setState(prev => ({...prev,empId:"",empName:"",teamName:"",experience:""}))
  };

  handleAddOrDeleteTeam = (e, action) => {
    // code goes here to swtich between add or delete team
    this.setState(prev => ({...prev,...action === "create" ? {createTeam:!prev.createTeam,deleteTeam:false} : {deleteTeam:!prev.deleteTeam,createTeam:false}}));
    e.preventDefault;
  };

  handleCancel = (e, action) => {
    //code goes here to handle cancel button
    this.setState(prev => ({...prev,...action === "create" ? {createTeam:false} : {deleteTeam:false}}));
    e.preventDefault;
  };

  handleSave = async (e) => {
    //code goes here to handle save button
    const resp = await this.saveTeam();
    this.handleClear();
    e.preventDefault;
  };

  saveTeam = async () => {
    const {newTeam} = this.state;
    //code goes here to return the status of /technologies/add api
    try{
      const newTeamDetails = await fetch("/api/tracker/technologies/add",{
        method:"post",
        body: JSON.stringify({technology_name:newTeam}),
        headers :{
          "Authorization" : `Bearer ${this.getLocalStorage()}`,
          "Content-type": "application/json; charset=UTF-8",
        }
      });
      return newTeamDetails.data;
    }catch(e){
      return null;
    }
  };

  handleRemoveTeam = async (e, tech) => {
    //code goes here to handle remove team using the value returned from removeTeamRequest function
    await this.removeTeamRequest(tech);
      // this.props.history?.push("/addMember");
    e.preventDefault;
  };

  removeTeamRequest = async (id) => {
     //code goes here to return response status of remove technologies api
     
    const res = await fetch(`/api/tracker/technologies/remove/${id}`,{
      method: "Delete",
      headers: {
        "Authorization" : `Bearer ${this.getLocalStorage()}`,
      },
    });
    return res.data
  };

  render(){
    return (
      <>
        <Header />
        <form>
          <h1>Add Team Member</h1>
          <div>
            {/*code goes here to display the input fields, Plus and Delete button*/}
                <input type="number" name="empId" placeholder="employee id" onChange={this.handleChange}  value={this.state.empId}/>
                <span>{this.state.errorStmtEmpId}</span>
                <input type="text" name="empName" placeholder="employee name" onChange={this.handleChange}  value={this.state.empName}/>
                <span>{this.state.errorStmtEmpName}</span>
                <select 
                  name="teamName"
                  onChange={this.handleChange}
                  value={this.state.teamName}>
                  <option value="" disabled={true} selected>--Select Team--</option>
                    {
                      this.state.teams.map((ech,index) => <option key={index} selected={ech.name === this.state.teamName} value={ech.name}>{ech.name}</option>)
                    }
                </select>
                <button onClick={(e)=>this.handleAddOrDeleteTeam(e,"create")}>+</button>
                <button onClick={(e)=>this.handleAddOrDeleteTeam(e,"delete")}>Delete</button>
            {
              this.state.createTeam === true &&
              <div className="addList">
                <p>Create New Label</p>
                {/*code goes here for the input fields and buttons to add a team*/}
                <input name="newTeam" onChange={this.handleChange} value={this.state.newTeam}/>
                <button className="save" disabled={!this.state.newTeam} onClick={this.handleSave}>Save</button>
                <button className="cancel" onClick={(e)=>this.handleCancel(e,"create")}>Cancel</button>
              </div>
            }
            { this.state.deleteTeam === true &&
              <div className="addList">
                <p>Delete Team</p>
                {/*code goes here to display teams with a 'x' button and a cancel button*/}
                {/*teams with a x and cancel button should be displayed in a table*/}
                <table>
                  <tbody>
                    {
                      this.state.teams.map(ech => 
                        <tr key={ech._id}>
                          <td>{ech.name}</td>
                          <td>
                            <img src={remove} alt="x" onClick={(e)=>this.handleRemoveTeam(e,ech.name)}/>
                          </td>
                        </tr>)
                    }
                    <tr>
                      <td>
                        <button className="cancel" onClick={(e)=>this.handleCancel(e,"delete")}>Cancel</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                
              </div>
            }
            {/*code goes here for the experience input field*/}
            <input type="number" name="experience" placeholder="experience" onChange={this.handleChange} value={this.state.experience}/>
            <span>{this.state.errorStmtExperience}</span>
            </div>
          <div>
            <button className="button" disabled={!(this.state.errorStmtEmpId.length <= 0 && this.state.errorStmtEmpName.length <= 0  &&  this.state.errorStmtExperience.length <= 0 && this.state.empId.length > 0 && this.state.teamName.length > 0)} onClick={(e) => this.handleAddMember(e)}>
              Add
            </button>
            <button className="button" onClick={() => this.handleClear()}>
              Clear
            </button>
          </div>
        </form>
      </>
    );
  }
}

// export default AddMember;
export default AddMember;
