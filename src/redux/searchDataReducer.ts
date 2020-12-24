import getWeatherData from "../api/getWeatherData";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./rootReducer";

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
  error: string | undefined;
}

const initialState: IState = {
  data: undefined,
  status: "idle",
  error: undefined,
};

export const getData = createAsyncThunk(
  "searchData/getData",
  async (city: string) => {
    const response = await getWeatherData(city);
    return response;
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
      })
      .addCase(getData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const getSearchData = (state: RootState) => state.searchData;

export default searchDataSlice.reducer;
