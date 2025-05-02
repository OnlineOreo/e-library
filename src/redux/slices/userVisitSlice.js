// src/redux/slices/userVisitSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sessionStarted: false,
  sessionStartTime: null,
  sessionId: null,
};

const userVisitSlice = createSlice({
  name: "userVisit",
  initialState,
  reducers: {
    startSession: (state, action) => {
      state.sessionStarted = true;
      state.sessionStartTime = action.payload.startTime;
      state.sessionId = action.payload.sessionId;
    },
    endSession: (state) => {
      state.sessionStarted = false;
      state.sessionStartTime = null;
      state.sessionId = null;
    },
  },
});

export const { startSession, endSession } = userVisitSlice.actions;
export default userVisitSlice.reducer;
