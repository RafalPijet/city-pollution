import {createActionName} from "../../utilities/functions";

const reducerName = 'values';

//ACTIONS TYPE
export const SET_AVAILABLE_COUNTRIES = createActionName(reducerName, 'SET_AVAILABLE_COUNTRIES');

//CREATORS OF ACTIONS
export const setAvailableCountries = countries => ({countries, type: SET_AVAILABLE_COUNTRIES});

//SELECTORS
export const getAvailableCountries = store => store.values.countries;

