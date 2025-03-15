import { configureStore } from "@reduxjs/toolkit";
import instituteReducer from "./slices/instituteSlice";

const store = configureStore({
  reducer: {
    institute: instituteReducer,
  },
});

export default store;
