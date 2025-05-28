import { Outlet, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogoutUser } from "../app/slice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.app.user);
  const handleLogout = () => {
    dispatch(setLogoutUser());
    navigate("/login");
  }

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-primary text-light w-100 px-5 justify-content-between">
        <h3>Student Admission Portal</h3>
      
      { user?.isAdmin === true && (
        <ul className="navbar-nav">
          <li className="nav-item px-2 pt-2">
            <Link className="tab" to="/applications">Applications</Link>
          </li>
          <li className="nav-item px-2 pt-2">
            <Link className="tab" to="/addseats">Add Seats</Link>
          </li>

          <li className="nav-item mt-2 ms-5 ps-5 me-2 fw-bold">User: Admin</li>
          <li className="nav-item">
            <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      )}
      { user?.isAdmin === false && (
        <ul className="navbar-nav">
          <li className="nav-item px-2 pt-2">
            <Link className="tab" to="/apply">Apply Course</Link>
          </li>
          <li className="nav-item px-2 pt-2">
            <Link className="tab" to="/status">Application Status</Link>
          </li>
          <li className="nav-item mt-2 ms-5 ps-5 me-2 fw-bold">
            User: {user?.name}
          </li>
          <li className="nav-item">
            <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      )}
      </nav>
      <Outlet />
    </div>
  );
};

export default Navbar;
