import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sessionId: null,
  started: false,
  startTime: null,
};

const userVisitSlice = createSlice({
  name: 'userVisit',
  initialState,
  reducers: {
    startSession: (state, action) => {
      state.sessionId = action.payload.sessionId;
      state.started = true;
      state.startTime = action.payload.startTime;
    },
    endSession: (state) => {
      state.sessionId = null;
      state.started = false;
      state.startTime = null;
    },
    restoreSession: (state, action) => {
      // Optional: allows restoring session from sessionStorage after refresh
      state.sessionId = action.payload.sessionId;
      state.started = true;
      state.startTime = action.payload.startTime;
    }
  },
});

export const { startSession, endSession, restoreSession } = userVisitSlice.actions;
export default userVisitSlice.reducer;
