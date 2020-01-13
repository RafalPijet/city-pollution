import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import values from './reducers/valuesReducer';
import request from './reducers/requestReducer';
import pollution from './reducers/pollutionReducer';

const reducers = combineReducers({
    values,
    request,
    pollution
});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
