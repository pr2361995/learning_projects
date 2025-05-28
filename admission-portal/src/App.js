import "./App.css";
// import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route,Navigate  } from "react-router-dom";
// import { Redirect } from "reach-router"
import Navbar from "./pages/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ApplyCourse from "./pages/ApplyCourse";
import ApplicationStatus from "./pages/ApplicationStatus";
import ViewApplications from "./pages/ViewApplications";
import AddSeats from "./pages/AddSeats";
import NoPage from "./pages/NoPage";

function App() {
  // const user = useSelector((store) => store.app.user);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
              {/* <Route index element={<Login />} /> */}
              <Route exact path="/signup" element={<Signup />} />
              <Route exact path="/apply" element={<ApplyCourse />} />
              <Route exact path="/status" element={<ApplicationStatus />} />
              <Route path="/login" element={<Login/>}/>
              <Route exact path="/applications" element={<ViewApplications />} />
              <Route exact path="/addseats" element={<AddSeats />} />
              <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
