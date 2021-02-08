import getWeatherData from "../api/getWeatherData";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./rootReducer";
import localStorageHandler from "../utils/localStorageHandler";

type DataType = {
  celsius: number;
  feelsLike: number;
  city: string;
  weather: Array<{ id: number; main: string; description: string }>;
  wind: number;
};

export interface IState {
  data: DataType | undefined;
  status: string;
  recentCities: Array<string | null>;
  error: string | undefined;
}

const initialState: IState = {
  data: undefined,
  status: "idle",
  recentCities: [],
  error: undefined,
};

export const getData = createAsyncThunk(
  "searchData/getData",
  async (city: string, thunkAPI) => {
    const response = await getWeatherData(city);
    if (response.status === 404) {
      return thunkAPI.rejectWithValue(response.data);
    } else return response;
  }
);

const searchDataSlice = createSlice({
  name: "searchData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        localStorageHandler(action, state);
      })
      .addCase(getData.rejected, (state, action: any) => {
        state.status = "rejected";
        state.error = action.payload.message;
      });
  },
});

export const getSearchData = (state: RootState) => state.searchData;
export const getRecentCities = (state: RootState) =>
  state.searchData.recentCities;

export default searchDataSlice.reducer;
