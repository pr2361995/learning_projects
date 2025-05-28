import React, { Component, Fragment } from 'react'
import Users from './Users'
import classes from "./UserFinder.module.css";

const DUMMY_USERS = [
    { id: 'u1', name: 'Max' },
    { id: 'u2', name: 'Manuel' },
    { id: 'u3', name: 'Julie' },
  ];


export default class UserFinder extends Component {
    constructor(){
        super();
        this.state = {
            filterUsers : [],
            searchTeam : ""
        }
        console.log("state",this.state);
    }

    componentDidMount(){
        // sent the http request
        this.setState({filterUsers:DUMMY_USERS});
    }

    componentDidUpdate(prevProps,prevState){
        if(prevState.searchTeam !== this.state.searchTeam){
            this.setState({
                filterUsers: DUMMY_USERS.filter(user => 
                    user.name.toLocaleLowerCase().includes(this.state.searchTeam.toLocaleLowerCase())
                )
            });
        }
    }

    handleSearchTeams(e){
        const {value} = e.target;
        this.setState({searchTeam:value})
    }

  render() {
    return (
      <Fragment>
        <div className={classes.finder}>
            <input value={this.state.searchTeam} onChange={this.handleSearchTeams.bind(this)} placeholder='Search'/>
        </div>
        <Users users={this.state.filterUsers}/>
      </Fragment>
    )
  }
}
