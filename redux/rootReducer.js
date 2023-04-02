import { combineReducers } from "redux";
import activityReducer from "./reducers/activityReducer";

const rootReducer = combineReducers({
  activity: activityReducer,
});

export default rootReducer;
