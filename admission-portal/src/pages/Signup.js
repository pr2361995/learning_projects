import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";

const intialDetail = {
  email     : "",
  password  : "",
  confirmpassword : "",
  name      : "",
  age       : "",
  mobile    : "",
  address   : "",
  markPercentage : ""
}

const Signup = () => {
  const navigate = useNavigate();
  const [signupDetail,setSignupDetail] = useState({...intialDetail});
  const [errors,setErrors] = useState("");

  const signUpValidation = () => {
    return Object.keys(intialDetail).every(field => signupDetail[field]) ?
      ((signupDetail.password === signupDetail.confirmpassword) ? null : "Confirm Password does not match")
    :
      "Please fill all the input fields";
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const err = signUpValidation();
    if(!err) {
      const reqData = {...signupDetail};
      reqData.id = new Date().getTime();
      delete reqData.confirmpassword;
      axios.get(`http://localhost:8001/applicants?email=${reqData.email}`)
      .then((response)=> {
        response.data.length === 0 ? 
          axios.post(`http://localhost:8001/applicants`,reqData)
          .then(da => { setErrors(''); navigate("/apply")})
          .catch(e => setErrors(e.toString()))
        : 
          setErrors("Email already registered");
      })
      .catch((e) => setErrors(e.toString()));
    } else {
        setErrors(err);
    }
  }

  const handleChange = (e) => {
    setSignupDetail(prev => ({...prev,[e.target.name] : e.target.value}));
  }

  return (
    <div>
      <form className="container mt-2">
        <div className="form-header">
          <h3>Signup</h3>
          <p>Create new account here</p>
        </div>

        <input
          type="text"
          name="email"
          id="email"
          placeholder="enter your email"
          className="form-control mt-2"
          value={signupDetail.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          id="password"
          value={signupDetail.password}
          onChange={handleChange}
          placeholder="choose password"
          className="form-control mt-2"
          required
        />
        <input
          type="password"
          name="confirmpassword"
          id="confirmpassword"
          value={signupDetail.confirmpassword}
          onChange={handleChange}
          placeholder="confirm password"
          className="form-control mt-2"
          required
        />
        <input
          type="text"
          name="name"
          id="name"
          value={signupDetail.name}
          onChange={handleChange}
          placeholder="your name"
          className="form-control mt-2"
        />
        <input
          type="number"
          name="age"
          id="age"
          value={signupDetail.age}
          onChange={handleChange}
          placeholder="your age"
          className="form-control mt-2"
        />
        <input
          type="number"
          name="mobile"
          id="mobile"
          value={signupDetail.mobile}
          onChange={handleChange}
          placeholder="your mobile number"
          className="form-control mt-2"
        />
        <textarea
          name="address"
          rows="2"
          cols="50"
          id="address"
          value={signupDetail.address}
          onChange={handleChange}
          placeholder="your address"
          className="form-control mt-2"
        />
        <input
          type="number"
          name="markPercentage"
          id="markPercentage"
          value={signupDetail.markPercentage}
          onChange={handleChange}
          placeholder="Mark Percentage in 12th grade"
          className="form-control mt-2"
        />

        <p className="text-danger" id="errorMessage">
          {errors}
        </p>
        <button className="btn btn-primary" id="submitButton" onClick={handleSubmit}>
          SIGN UP
        </button>
        <div className="form-group pt-3">
          <p>
            Already have an Account <Link to="/login">Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
