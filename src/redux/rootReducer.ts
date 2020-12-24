import { combineReducers } from "redux";
import searchDataReducer from "./searchDataReducer";
import citiesReducer from "./citiesReducer";

const rootReducer = combineReducers({
  searchData: searchDataReducer,
  cities: citiesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
