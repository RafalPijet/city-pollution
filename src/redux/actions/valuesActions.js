import {createActionName} from "../../utilities/functions";

const reducerName = 'values';

//ACTIONS TYPE
export const SET_AVAILABLE_COUNTRIES = createActionName(reducerName, 'SET_AVAILABLE_COUNTRIES');
export const SET_SELECTED_COUNTRY = createActionName(reducerName, 'SET_SELECTED_COUNTRY');
export const SET_CITIES_OF_COUNTRY = createActionName(reducerName, 'SET_CITIES_OF_COUNTRY');

//CREATORS OF ACTIONS
export const setAvailableCountries = countries => ({countries, type: SET_AVAILABLE_COUNTRIES});
export const setSelectedCountry = country => ({country, type: SET_SELECTED_COUNTRY});
export const setCitiesOfCountry = cities => ({cities, type: SET_CITIES_OF_COUNTRY});

//SELECTORS
export const getAvailableCountries = store => store.values.countries;
export const getSelectedCountry = store => store.values.selectedCountry;
export const getCitiesOfCountry = store => store.values.citiesOfCountry;
