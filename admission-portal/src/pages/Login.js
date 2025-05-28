import React, { useState } from "react";
import { Link, useAsyncError, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoggedUser } from "../app/slice";
import axios from "axios";

const intialUserDetail = {
  user : false,
  email :"",
  password : ""
}

const Login = () => {
  const [userDetail,setUserDetails] = useState({...intialUserDetail});
  const [errors,setErrors] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  console.log("userdetails",userDetail);

  const userValidation = () => !userDetail.email && !userDetail.password

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors("");
    if(!userValidation()){
      userDetail.user === false ? (
        axios.get(`http://localhost:8001/applicants?email=${userDetail.email}`)
        .then((response) => {
              const users = response.data;
              if(users.length > 0 ){
                if(users[0].password === userDetail.password){
                  dispatch(setLoggedUser({isAdmin:userDetail.user,...users[0]}));
                  navigate("/apply");
                }else
                  setErrors("Password is incorrect");
              }else
                setErrors("Email not registered");
          })
        .catch(e => setErrors(e.toString()))
      ) : (
        axios.get(`http://localhost:8001/admin?email=${userDetail.email}`)
        .then((response) => {
            const users = response.data;
            if(users.length > 0 ){
              if(users[0].password === userDetail.password){
                dispatch(setLoggedUser({isAdmin:userDetail.user,...users[0]}));
                navigate("/applications")
              }else
                setErrors("Password is incorrect");
            }else
              setErrors("Email not registered");
          })
        .catch(e => setErrors(e.toString()))
      )
    }else {
      setErrors("validation failed,Required field's is missing")
    }
    /*
    To get user credentials
    Use url-  /api/applicants?email=${email} with GET method 

    To get admin credentials
    Use url-  /api/admin?email=${email} with GET method 
    */
  };
  const handleChange = (e) => {
    debugger;
    setUserDetails(prev => ({...prev,[e.target.name] : e.target.value}))
  }

  const handleChecked = (e) => {
    setUserDetails(prev => ({...prev,[e.target.name] : e.target.checked}))
  }

  return (
    <div>
      <form className="container mt-5" onSubmit={handleSubmit}>
        <div className="form-header">
          <h3 id="loginHeader">Admin Login / Applicant Login</h3>
          <div className="float-right ">
            <input
              type="checkbox"
              id="userType"
              name="user"
              checked={userDetail.user}
              onChange={handleChecked}
              className="form-check-input"
            />
            <label className="form-check-label ps-2">Admin</label>
          </div>
          <br />
          <p>Enter your credentials here to Login</p>
        </div>

        <input
          type="email"
          name="email"
          value={userDetail.email}
          onChange={handleChange}
          id="userEmail"
          placeholder="your email"
          className="form-control mt-2"
          required
        />
        <input
          type="password"
          name="password"
          value={userDetail.password}
          onChange={handleChange}
          id="userPassword"
          placeholder="password"
          className="form-control mt-2"
          required
        />
        <p className="text-danger" id="errorMessage">
          {errors}
        </p>
        <button className="btn btn-primary" id="loginButton" type="submit">
          Login
        </button>
        <div className="form-group pt-3">
          <p>
            Do not have an Account{" "}
            <Link id="signupLink" to="/signup">
              Signup
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
