import getWeatherData from "../api/getWeatherData";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
    data: {},
    status: 'idle',
    error: null
};

export const getData = createAsyncThunk('searchData/getData', async (city) => {
    const response = await getWeatherData(city);
    return response;
});
 
const searchDataSlice = createSlice({
    name: "searchData",
    initialState,
    reducers: {},
    extraReducers: {
        [getData.pending] : (state, action) => {
            state.status = 'loading'
        },
        [getData.fulfilled] : (state, action) => {
            state.status = 'succeeded';
            state.data = action.payload;
        },
        [getData.rejected] : (state, action) => {
            state.status = "failed";
            state.error = action.error.message
        }
    }
});

export const getSearchData = (state) => state.searchData;

export default searchDataSlice.reducer;
