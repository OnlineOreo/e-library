import { createSlice } from "@reduxjs/toolkit";

const instituteSlice = createSlice({
  name: "institute",
  initialState: {
    instituteId: null,
  },
  reducers: {
    setInstituteId: (state, action) => {
      state.instituteId = action.payload;
    },
  },
});

export const { setInstituteId } = instituteSlice.actions;
export default instituteSlice.reducer;
