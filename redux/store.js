import { configureStore } from "@reduxjs/toolkit";
import activityReducer from "./reducers/activityReducer";

export default configureStore({
  reducer: {
    activity: activityReducer,
  },
});
