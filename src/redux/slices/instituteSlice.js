'use client'
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchInstituteId = createAsyncThunk("institute/fetchInstituteId", async () => {
  const hostname = typeof window !== "undefined" ? window.location.hostname : "";
  // const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/institute?sub_domain=${hostname}`;
  const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/institute?sub_domain=mriirs.libvirtuua.com`;
  
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
