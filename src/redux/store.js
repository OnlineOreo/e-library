import { configureStore } from "@reduxjs/toolkit";
import instituteReducer from "./slices/instituteSlice";
import landingPageDataSlice from "./slices/landingPageData";

const store = configureStore({
  reducer: {
    institute: instituteReducer,
    landingPageDataSlice:landingPageDataSlice,
  },
});

export default store;
