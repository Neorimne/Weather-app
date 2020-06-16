import getWeatherData from "../api/getWeatherData";

const SET_NEW_SEARCH_DATA = 'SET_NEW_SEARCH_DATA';
const SET_SEARCH_INPUT = 'SET_SEARCH_INPUT';
const SET_IS_FETCHING = 'SET_IS_FETCHING';

const initState = {
    data: {},
    searhInput: '',
    isFetching: true
}

const searchDataReducer = (state = initState, action) => {
    switch (action.type){
        case SET_NEW_SEARCH_DATA:
            return{
                ...state,
                data: action.data
            };
        case SET_SEARCH_INPUT:
            return {
                ...state,
                searhInput: action.searhInput
            }
        case SET_IS_FETCHING: 
            return {
                ...state,
                isFetching: action.isFetching
            }
        default:
            return state
    }
};

export const setSearchData = (data) => ({type: SET_NEW_SEARCH_DATA, data});
export const setSearchInput = (searchInput) => ({type: SET_SEARCH_INPUT, searchInput});
export const setIsFetching = (isFetching) => ({type: SET_IS_FETCHING, isFetching});

export const getData = (city) => {
    return async (dispatch) => {
        const data = await getWeatherData(city);
        dispatch(setSearchData(data));
        dispatch(setIsFetching(false));
    }
}
export default searchDataReducer;