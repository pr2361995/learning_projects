import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCourses, getApplicationStatus } from "../app/slice";

//Dispatch 'getCourses' to get available courses
//Dispatch 'getApplicationStatus' to get user applications. Prevent user to reapply for same course.
import axios from "axios";

function ApplyCourse() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.app.user);
  const [errors,setErrors] = useState("");
  const [courses,setCourse] = useState([]);

  const getcourseApi = async () => {
    const updateCourses = await dispatch(getCourses());
    if (getCourses.fulfilled.match(updateCourses)) {
      setCourse(updateCourses.payload);
    } else {
      console.log("errors");
    }

  }
  useEffect(()=>{
    getcourseApi();
    return () => {};
  },[])


  const applyCourse = async (course) => {
    
    const requestbody = {
      "id"              : new Date().getTime(),
      "applicantEmail"  : user.email,
      "applicantName"   : user.name,
      "courseId"        : course.courseId,
      "courseName"      : course.courseName,
      "status"          : "Pending",
      "markPercentage"  : user.markPercentage,
    };

    axios.get(`http://localhost:8001/applications?applicantEmail=${user.email}&courseId=${course.courseId}`)
    .then(res => { 
      if(res.data.length === 0){
        axios.post("http://localhost:8001/applications",requestbody)
        .then(response => alert('Your application submitted successfully'))
        .catch(e => setErrors(e.toString()))
      }else 
        setErrors("already applied")
    })
    .catch(e => setErrors(e.toString()))



    /*
    To submit user application 
    Use url-  /api/applications with POST method 
    

      
      On success display the alert - 'Your application submitted successfully' */
  };

  return (
    <div className="container">
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Course Id</th>
            <th scope="col">Course Name</th>
            <th scope="col">Available Seats</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(course => 
            <tr key={course.id}>
              <td>{course.courseId}</td>
              <td>{course.courseName}</td>
              <td>{course.availableSeats}</td>
              <td>
                <button className="btn btn-outline-success mx-1" disabled={course.availableSeats > 0 ? false : true} onClick={() => applyCourse(course)}>Apply</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ApplyCourse;
