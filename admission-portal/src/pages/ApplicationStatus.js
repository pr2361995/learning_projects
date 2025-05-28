import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getApplicationStatus } from "../app/slice";

//Dispatch 'getApplicationStatus' to get all user applications.
function ApplicationStatus() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [applications,setApplications] = useState([]);
  const user = useSelector((store) => store.app.user);

  const getApplicationsApi = async () => {
    const updateCourses = await dispatch(getApplicationStatus({email:user.email}));
    if (getApplicationStatus.fulfilled.match(updateCourses)) {
      setApplications(updateCourses.payload);
    } else {
      console.log("errors");
    }
  }

  useEffect(()=>{
    getApplicationsApi();
    return () => {};
  },[])

  return (
    <div className="container">
      <h3>Your Applications</h3>
      {applications.length === 0  ?
        <p>You have not applied for any course.</p>
       :
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Application Id</th>
              <th scope="col">Course Id</th>
              <th scope="col">Course Name</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {
              applications.map(application =>
                <tr key={application?.id}>
                  <td>{application?.id}</td>
                  <td>{application?.courseId}</td>
                  <td>{application?.courseName}</td>
                  <td>{application?.status}</td>
                </tr>
              )
            }
          </tbody>
        </table>
      }
    </div>
  );
}

export default ApplicationStatus;
