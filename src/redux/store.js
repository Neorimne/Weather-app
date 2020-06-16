import {combineReducers, createStore, applyMiddleware} from 'redux';
import searchDataReducer from './searchDataReducer';
import thunkMiddleware from 'redux-thunk';

const rootReducer = combineReducers({
    searchData: searchDataReducer
});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
export default store;

