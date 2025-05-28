import React from "react";
import { Link } from "react-router-dom";
import logout from "../icon/logout.png";
import { withRouter } from "react-router-dom";
import home from "../icon/home.png";


export const Header = (props) => {
  function handleLogout() {
    // code goes here to handle logout
    localStorage.removeItem("token");
    props.history?.push("/login")
  }
  function handleHome() {
    //code goes here to handle home icon
    props.history?.push("/")
  }

  return (
    <>
      <nav style={{display:"flex",gap:"1rem"}}>
        <Link to="/addMember">Add Member</Link>
        <Link to="/moveMember">Move Member</Link>
      </nav>
      <header>
        <h1>Team Tracker
        <img src={logout} alt="logout" onClick={() => handleLogout()}/>
        <img src={home} alt="home" onClick={() => handleHome()}/>
        </h1>
      </header>
    </>
  );
}

export default withRouter(Header);
