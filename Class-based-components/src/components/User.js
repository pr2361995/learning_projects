import classes from './User.module.css';
import {Component} from "react";

class User extends Component {
  render (){
    const {name} = this.props
    return <li className={classes.user}>{name}</li>;
  }
};

export default User;
