import { configureStore } from "@reduxjs/toolkit";
import instituteReducer from "./slices/instituteSlice";
import landingPageDataSlice from "./slices/landingPageData";
import userVisitReducer from "./slices/userVisitSlice"; 

const store = configureStore({
  reducer: {
    institute: instituteReducer,
    landingPageDataSlice: landingPageDataSlice,
    userVisit: userVisitReducer,
  },
});

export default store;
