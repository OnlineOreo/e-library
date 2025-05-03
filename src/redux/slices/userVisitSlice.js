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
      state.started = false;
      state.sessionId = null;
      state.startTime = null;
    },
  },
});

export const { startSession, endSession } = userVisitSlice.actions;
export default userVisitSlice.reducer;
