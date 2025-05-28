import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getApplications,
  modifyApplicationStatus,
  getCourses,
} from "../app/slice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ViewApplications() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [applications,setApplications] = useState([]);
  const [errors,setErrors] = useState("");

  const getApplicationsApi = async () => {
    const updateCourses = await dispatch(getApplications());
    if (getApplications.fulfilled.match(updateCourses)) {
      setApplications(updateCourses.payload);
    } else {
      setErrors("get applications failed");
    }
  }

  useEffect(()=>{
    getApplicationsApi();
    return () => {};
  },[])

  const changeTheStatus = async (cId,id,status) => {

    axios.get(`http://localhost:8001/courses/${cId}`)
    .then(async ({data}) =>{
      if ( data.availableSeats > 0 ) {
        const updateCourses = await dispatch(modifyApplicationStatus({id,status}))
        if (modifyApplicationStatus.fulfilled.match(updateCourses)) {
          axios.patch(`http://localhost:8001/courses/${cId}`,{availableSeats : data.availableSeats - 1})
          .then(() => {
            getApplicationsApi();
          })
          .catch(e => setErrors(e.toString()))
        } else {
          setErrors("application status modified is failed");
        }
      }else{
        alert("no availablle seats");
      }
    })
    .catch(e => setErrors(e.toString()));
  }


  /* To Approve/ Reject an application dispatch 'modifyApplicationStatus'
     To get all user applications dispatch 'getApplications'
     To get all course details dispatch 'getCourses' to know seat availability
  */

  return (
    <div className="container mt-3">
      <h4 className="text-primary">New Applications</h4>
      {
        applications.some(app => app.status === "Pending") ?
          <table className="table table-hover mb-5" id="newApplicationsTable">
            <thead>
              <tr>
                <th scope="col">Application Id</th>
                <th scope="col">Course Id</th>
                <th scope="col">Course Name</th>
                <th scope="col">Applicant Name</th>
                <th scope="col">Applicant Email</th>
                <th scope="col">Mark Percentage</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.filter(app => app.status === "Pending").map(app => 
              <tr key={app.id}>
                <td>{app.id}</td>
                <td>{app.courseId}</td>
                <td>{app.courseName}</td>
                <td>{app.applicantName}</td>
                <td>{app.applicantEmail}</td>
                <td>{app.markPercentage}</td>
                <td>
                  <button className="btn btn-success mx-1" onClick={()=>changeTheStatus(app.courseId,app.id,"Approved")}>Approve</button>
                  <button className="btn btn-danger mx-1" onClick={()=>changeTheStatus(app.courseId,app.id,"Rejected")}>Reject</button>
                </td>
              </tr>
              )}
            </tbody>
          </table>
        :
          <p>No new applications</p> 
      }
      <hr></hr>
      <h4 className="text-primary">Approved Applications</h4>
      { 
        applications.some(app => app.status === "Approved") ?
          <table className="table table-hover mb-5" id="approvedApplicationsTable">
            <thead>
              <tr>
                <th scope="col">Application Id</th>
                <th scope="col">Course Id</th>
                <th scope="col">Course Name</th>
                <th scope="col">Applicant Name</th>
                <th scope="col">Applicant Email</th>
                <th scope="col">Mark Percentage</th>
              </tr>
            </thead>
            <tbody>
            {applications.filter(app => app.status === "Approved").map(app => 
              <tr key={app.id}>
                <td>{app.id}</td>
                <td>{app.courseId}</td>
                <td>{app.courseName}</td>
                <td>{app.applicantName}</td>
                <td>{app.applicantEmail}</td>
                <td>{app.markPercentage}</td>
              </tr>
              )}
            </tbody>
          </table>
        :
           <p>No approved applications</p>
      }
      <hr></hr>
      <h4 className="text-primary">Rejected Applications</h4>
      { 
        applications.some(app => app.status === "Rejected") ?
          <table className="table table-hover mb-5" id="rejectedApplicationsTable">
            <thead>
              <tr>
                <th scope="col">Application Id</th>
                <th scope="col">Course Id</th>
                <th scope="col">Course Name</th>
                <th scope="col">Applicant Name</th>
                <th scope="col">Applicant Email</th>
                <th scope="col">Mark Percentage</th>
              </tr>
            </thead>
            <tbody>
            {applications.filter(app => app.status === "Rejected").map(app => 
              <tr key={app.id}>
                <td>{app.id}</td>
                <td>{app.courseId}</td>
                <td>{app.courseName}</td>
                <td>{app.applicantName}</td>
                <td>{app.applicantEmail}</td>
                <td>{app.markPercentage}</td>
              </tr>
              )}
            </tbody>
          </table>
        :
          <p>No rejected applications</p>
      }
    </div>
  );
}

export default ViewApplications;
