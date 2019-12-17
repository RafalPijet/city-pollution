import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import values from './reducers/valuesReducer';
import request from './reducers/requestReducer';
import pollution from './reducers/pollutionReducer';

const reducers = combineReducers({
    values,
    request,
    pollution
});

const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

export default store;
