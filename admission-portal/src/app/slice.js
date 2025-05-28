import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getApplications = createAsyncThunk("getApplications", async () => {
  /* Get applications of all user  
     Use url-  /api/applications with GET method */
  const response = await axios.get("http://localhost:8001/applications");
  return response.data;

});

export const modifyApplicationStatus = createAsyncThunk(
  "modifyApplicationStatus",
  async (args) => {
    const response = await axios.patch(`http://localhost:8001/applications/${args.id}`,{status : args.status});
    return response.data;
    /* To modify the status of Application  
       Use url-  /api/applications/${id} with PATCH method 
       Req body - { status: <newStatus> },  newstatus can be Approved/Rejected*/

});

export const getCourses = createAsyncThunk("getCourses", async () => {
   /* Get all courses offered 
     Use url-  /api/courses with GET method */
  const response = await axios.get("http://localhost:8001/courses");
  return response.data;
});

export const addSeats = createAsyncThunk("addSeats", async (args) => {
  /* To modify seatCount of Course 
    Use url-  /api/courses/${id} with PATCH method 
    Req body - { availableSeats: <updatedSeatCount> } */
    const response = await axios.patch(`http://localhost:8001/courses/${args.id}`,{availableSeats:args.seatCount});
    return response.data;

});

export const getApplicationStatus = createAsyncThunk(
  "getApplicationStatus",
  async (args) => {
    /* Get applications of logged user  
     Use url-  /api/applications?applicantEmail=${email} with GET method */
    const response = await axios.get(`http://localhost:8001/applications?applicantEmail=${args.email}`)
    return response.data;
  }
);

const initialState = {
  user: {},
  courses: [],
  applicant: [],
  applications: []
};

export const slice = createSlice({
  name: "admissions",
  initialState,
  reducers: {
    setLoggedUser: (state, action) => {
      state.user  = action.payload
    },
    setLogoutUser: (state, action) => {
      state.user  = {}
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getApplications.fulfilled, (state, action) => {
      state.applications.push(action.payload);
    });

    builder.addCase(getApplicationStatus.fulfilled, (state, action) => {
      state.applications.push(action.payload);
    });

    builder.addCase(getCourses.fulfilled, (state, action) => {
      state.courses.push(action.payload);
    });
  },
});

const { actions, reducer } = slice;
export const { setLoggedUser,setLogoutUser } = actions;
export default reducer;
