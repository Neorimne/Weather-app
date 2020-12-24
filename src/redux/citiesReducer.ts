import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetchCitiesData from "../api/fetchCitiesData";
import { RootState } from "./rootReducer";

export type CitiesDataType = {
  id: number;
  city: string;
  countryCode: string;
};

export interface ICitiesDataState {
  data: Array<CitiesDataType> | undefined;
  status: string;
  error: string | undefined;
}

const initialState: ICitiesDataState = {
  data: undefined,
  status: "idle",
  error: undefined,
};

export const getCitiesData = createAsyncThunk(
  "cities/getCitiesData",
  async (cityPrefix: string) => {
    const response = await fetchCitiesData(cityPrefix);
    return response.data;
  }
);

const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCitiesData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCitiesData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getCitiesData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const citiesSelector = (state: RootState) => state.cities.data;

export default citiesSlice.reducer;
