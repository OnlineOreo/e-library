import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// API URL
// const API_URL = "http://192.168.1.160:8080/api/institute?sub_domain=asdfgbhn.com";
const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/institute?sub_domain=mriirs.libvirtuua.com`;

// Async thunk to fetch institute_id
export const landingPageData = createAsyncThunk("institute/landingPageData", async () => {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
});

const landingPageDataSlice = createSlice({
  name: "institute",
  initialState: {
    landingPageData: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(landingPageData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(landingPageData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.instituteId = action.payload;
      })
      .addCase(landingPageData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default landingPageDataSlice.reducer;
