import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// API URL
// const API_URL = "http://192.168.1.160:8080/api/institute?sub_domain=asdfgbhn.com";
const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/institute?sub_domain=mriirs.libvirtuua.com`;

// Async thunk to fetch institute_id
export const fetchInstituteId = createAsyncThunk("institute/fetchInstituteId", async () => {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data.institute;
});

const instituteSlice = createSlice({
  name: "institute",
  initialState: {
    instituteId: null,
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInstituteId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchInstituteId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.instituteId = action.payload;
      })
      .addCase(fetchInstituteId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default instituteSlice.reducer;
