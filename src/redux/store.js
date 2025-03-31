import { configureStore } from "@reduxjs/toolkit";
import instituteReducer from "./slices/instituteSlice";
import landingPageDataSlice from "./slices/landingPageData";
import userReducer from "./slices/userSlice";

const store = configureStore({
  reducer: {
    institute: instituteReducer,
    landingPageDataSlice:landingPageDataSlice,
    user: userReducer,
  },
});

export default store;
