import searchDataReducer from './searchDataReducer';

const { configureStore } = require("@reduxjs/toolkit");

export default configureStore({
    reducer: {
        searchData: searchDataReducer
    }
});
