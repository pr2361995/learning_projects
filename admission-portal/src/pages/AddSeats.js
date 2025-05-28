import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCourses, addSeats } from "../app/slice";
import { useNavigate } from "react-router-dom";

//Dispatch 'getCourses' to get available courses
//Dispatch 'addSeats' to modify the seat count for a course

const AddSeats = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [courses,setCourse] = useState([]);
  const [selectedCourse,setSelectedCourse] = useState({});

  console.log("log",selectedCourse,courses);

  const getcourseApi = async () => {
    const updateCourses = await dispatch(getCourses());
    if (getCourses.fulfilled.match(updateCourses)) {
      setCourse(updateCourses.payload);
    } else {
      console.log("errors");
    }
  }
  const getApplicationsApi = async ({id,seatCount}) => {
    const updateCourses = await dispatch(addSeats({id,seatCount}));
    if (addSeats.fulfilled.match(updateCourses)) {
      setCourse(prev => prev.map(c => c.courseId === id ? {...c,availableSeats:seatCount} : c))
    } else {
      console.log("errors");
    }
  }

  const hanldeChange = (e) => {
    setSelectedCourse(prev => ({...prev,[e.target.name] : parseInt(e.target.value)}))
  }

  useEffect(()=>{
    getcourseApi();
    return () => {};
  },[])

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedCourse && selectedCourse?.id > 0) 
      getApplicationsApi(selectedCourse);
    else 
      console.log("Errors");
  };


  return (
    <div>
      
        <form className="container mt-5" onSubmit={handleSubmit}>
          <label className="px-2">
            Course:
            <select
              className="form-select"
              id="courseSelect"
              name="id"
              value={selectedCourse?.id}
              onChange={(e) =>setSelectedCourse(prev => (
                { 
                  ...prev,
                  [e.target.name] : parseInt(e.target.value),
                  "seatCount"       : courses.find(course => course.courseId === parseInt(e.target.value))?.availableSeats
                }))
              }
            >
              <option value="" disabled>
                Select Course
              </option>
              {
                courses.map(course => <option key={course.courseId} value={course.courseId}>{course.courseName + " (Id: " + course.courseId +")"}</option>)
              }
            </select>
          </label>
          <label className="px-2" id="availableSeats">
            Available Seats: --count--
            <input
              type="number"
              className="form-control"
              id="newSeatCount"
              placeholder="New count"
              name="seatCount"
              value={selectedCourse?.seatCount}
              onChange={hanldeChange}
            />
          </label>
          <input
            type="submit"
            className="btn btn-primary"
            id="submitButton"
            value="Submit"
          />
        </form>
    
    </div>
  );
};

export default AddSeats;
