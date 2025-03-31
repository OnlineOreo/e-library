import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // Store the entire user data
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload; // Store full user data
    },
    clearUser: (state) => {
      state.user = null; // Clear user data on logout
    },
  },
});

// Export actions
export const { setUser, clearUser } = userSlice.actions;

// Export reducer
export default userSlice.reducer;
