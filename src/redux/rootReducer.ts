import { combineReducers } from "redux";
import searchDataReducer from "./searchDataReducer";

const rootReducer = combineReducers({
  searchData: searchDataReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
