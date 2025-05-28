import React, { Component } from "react";
import Header from "../Components/Header";
import Teams from "../Components/Teams";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { baseurl} from "./helper";

const instance = axios.create({
  baseURL : baseurl,
  withCredentials: true,
  headers: {Authorization : `Bearer ${localStorage.getItem("token")}`}
});

class Home extends Component {
    // history = useHistory();
    constructor(props) {
      super(props);
      this.state = {
        data        : [], //hold the members data catagorised based on teams
        initialData : [], //hold the members data got from backend
        team        : [], //holds the teams data got from backend
        edit        : false, //handle edit mode for particular member 
        editId      : undefined, //holds _id of member in edit mode
        empId       : "", 
        empName     : "",
        experience  : "",
        teamName    : "",
        experienceFilter: "",
        checked     : "Expericence", 
      };
      this.setState = this.setState.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.getMember = this.getMember.bind(this);
      this.fetchData = this.fetchData.bind(this);

      this.getLocalStorage = this.getLocalStorage.bind(this);
      this.handleGetMembers = this.handleGetMembers.bind(this);
      this.handleGetTech = this.handleGetTech.bind(this);
      this.handleDeleteMembers = this.handleDeleteMembers.bind(this);
      this.handleDelete = this.handleDelete.bind(this);
      this.handleEdit = this.handleEdit.bind(this);

      this.handleChecked = this.handleChecked.bind(this);
      this.handleClear = this.handleClear.bind(this);
      this.handleGo = this.handleGo.bind(this);
      this.handleCancel = this.handleCancel.bind(this);
      this.handleEditRequest = this.handleEditRequest.bind(this);
      this.handleDone = this.handleDone.bind(this);
      
  }

  getMember = async (url) => {
    const members = await this.handleGetMembers(url);
    const combineData = [...new Set(members?.map(member => member.technology_name))].map(tcName => 
      members.filter(mem => mem.technology_name === tcName) 
    );
    return {members,combineData};
  }

  fetchData = async () => {
    const teamList = await this.handleGetTech();
    const {members,combineData} = await this.getMember("/api/tracker/members/display");
    this.setState(prev => ({...prev,team:teamList,initialData:members,data:combineData}))
  }

  async componentDidMount(){
    if(!this.getLocalStorage()){
      this.props.history?.push("/login");
    }else
      await this.fetchData();
  }

   //onMounting:     
      //if local storage had token proceed to set data in state
      //if local storage does not have token route back to login page  
      //code goes here to set initialData, team and data
      //initialData - holds the data got from back-end
      //data - holds data catagoried with team 
      //team - holds teams data got from back-end

   getLocalStorage = () => {
    //code goes here to get token value from local storage
    return localStorage.getItem("token");
  };

   handleGetMembers = async (url) => {
    //code goes here to return the respose of getMember api
      const members = await fetch(url,{
        headers: {
          "Authorization" : `Bearer ${this.getLocalStorage()}`,
        },
      });
      return members.data;
  };

   handleGetTech = async () => {
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
    //code goes here to handle onChange event for input fields except radio
    this.setState(prev => ({...prev,[name]:value}))
    e.preventDefault;
  };

   handleDeleteMembers = async (id) => {
    //code goes here to return the response status of delete api
    
    try {
      const members =  await fetch(`/api/tracker/members/delete/${id}`,{
        method: "Delete",
        headers: {
          "Authorization" : `Bearer ${this.getLocalStorage()}`,
        },
      });
      return members.data;
    }catch(e){
      alert("error "+ e.toString()) 
    }
  };

   handleDelete = async (e, id) => {
    //code goes here to handle delete member using return value of handleDeleteMembers function
    const res = await this.handleDeleteMembers(id);
    if(Object.keys(res).length > 0){
      const {members,combineData} = await this.getMember("/api/tracker/members/display");
      this.setState(prev => ({...prev,initialData:members,data:combineData}));
    }
    e.preventDefault;
  };

   handleEdit = (id) => {
    //code goes here to handle the edit button
    const memb = this.state.initialData.find(mem => mem._id === id);
    this.setState(prev => ({...prev,edit:true,editId:id, empId:memb.employee_id , empName:memb.employee_name, experience : memb.experience}))
  };

  handleChecked = (value) => {
    //code goes here for the onChange event of radio input fields
    this.setState(prev => ({...prev,checked:value}))
  };

  handleClear = async() => {
   //code goes here to handle the clear button
    const {combineData} = await this.getMember(`/api/tracker/members/display`);
    this.setState(prev => ({...prev,data:combineData,teamName:"",experienceFilter:"",checked:"Expericence"}));
  }

  handleGo = async () => {
    const {experienceFilter,checked,teamName} = this.state;
    //code goes here to handle go button
    const query = checked === "Expericence" ? `experience=${experienceFilter}` : checked === "Team" ? `tech=${teamName}` : `experience=${experienceFilter}&&tech=${teamName}`;
    const {combineData} = await this.getMember(`/api/tracker/members/display?${query}`);
    this.setState(prev => ({...prev,data:combineData}));
  };

  handleCancel = () => {
    //code goes here for cancel button 
    this.setState(prev => ({...prev,edit:false,editId:undefined,empId:"",empName:"",experience:""}));
  };

  handleEditRequest = async () => {
    //code goes here to return response status of update api
    const {editId,empId:employee_id,empName:employee_name,experience} = this.state;
    if(employee_id && employee_name && experience){
      const respData = await fetch(`/api/tracker/members/update/${editId}`,{
        method: "PATCH",
        body: JSON.stringify({employee_id,employee_name,experience}),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Authorization" : `Bearer ${this.getLocalStorage()}`,
        },
      });
      return respData.data;
    }else{
      alert("Invalid data");
      return null;
    }
  };

  handleDone = async (e) => {
    //code goes here to handle Done button using the return value of handleEditRequest function  
    const res = await this.handleEditRequest();
    if(Object.keys(res).length > 0){
      const {members,combineData} = await this.getMember("/api/tracker/members/display");
      this.setState(prev => ({...prev,initialData:members,data:combineData,editId:undefined,edit:false}));
    }
    e.preventDefault;
  };

  render() {
    return (
      <>
        <Header />
        <section>
          <label>Filter By</label>
            <input type="radio" value="Expericence" onChange={(e) => this.handleChecked("Expericence")} name="checked" checked={this.state.checked === "Expericence"}/> 
            <label>Expericence</label>
            <input type="radio" value="Team" name="checked" onChange={(e) => this.handleChecked("Team")} checked={this.state.checked === "Team"}/> 
            <label>Team</label>
            <input type="radio" value="Both" name="checked" onChange={(e) => this.handleChecked("Both")} checked={this.state.checked === "Both"}/> 
            <label>Both</label>
          {
            this.state.checked === "Expericence" ?
              <input 
                type="number" 
                name="experienceFilter" 
                placeholder="Expericence" 
                value={this.state.experienceFilter} 
                onChange={this.handleChange}/>
            : (
              this.state.checked === "Team" ?
                <select 
                  name="teamName"
                  value={this.state.teamName}
                  onChange={this.handleChange}>
                    <option value="" disabled={true} selected>Please select</option>
                      {
                        this.state.team.map(ech => <option key={ech.name} value={ech.name}>{ech.name}</option>)
                      }
                </select>
              :
                <>
                  <input 
                    type="number" 
                    name="experienceFilter" 
                    placeholder="Experience"
                    value={this.state.experienceFilter} 
                    onChange={this.handleChange}/>

                  <select 
                    name="teamName" 
                    value={this.state.teamName}
                    onChange={this.handleChange}>
                      <option value="" disabled={true} selected>Please select</option>
                      {
                        this.state.team.map(ech => <option key={ech.name} value={ech.name}>{ech.name}</option>)
                      }
                  </select>
                </>
            )
          }
          <button onClick={this.handleGo} disabled={this.state.checked === "Both"?
                              !(this.state.teamName.length > 0 && this.state.experienceFilter.length > 0)
                          : this.state.checked === "Team" ? 
                              !(this.state.teamName.length > 0)
                          : this.state.checked === "Expericence" ?
                              !(this.state.experienceFilter.length > 0)
                          : true}>
            Go
          </button>
          <button onClick={this.handleClear}>Clear</button>
        </section>
          {this.state.data.length > 0 && <Teams 
            data={this.state.data} 
            edit={this.state.edit}
            editId={this.state.editId}
            empId={this.state.empId}
            empName={this.state.empName}
            experience={this.state.experience}
            handleCancel={this.handleCancel}
            handleDone={this.handleDone}
            handleEdit={this.handleEdit}
            handleDelete={this.handleDelete}
            handleChange={this.handleChange} />}
        {this.state.data.length === 0 && <div className="noTeam">No Teams Found</div>}
        {/*Make sure, props name passed in child Component same as the state or function name which you are passing */}
      </>
    );
  }
}

export default Home;
