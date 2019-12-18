import {createActionName} from "../../utilities/functions";

const reducerName = 'pullution';

//ACTIONS TYPE
export const SET_PM25_POLLUTION = createActionName(reducerName, 'SET_PM25_POLLUTION');
export const SET_PM10_POLLUTION = createActionName(reducerName, 'SET_PM10_POLLUTION');
export const SET_SO2_POLLUTION = createActionName(reducerName, 'SET_SO2_POLLUTION');
export const SET_NO2_POLLUTION = createActionName(reducerName, 'SET_NO2_POLLUTION');
export const SET_TYPE_POLLUTION = createActionName(reducerName, 'SET_TYPE_POLLUTION');

//CREATORS OF ACTIONS
export const setPM25Pollution = cities => ({cities, type: SET_PM25_POLLUTION});
export const setPM10Pollution = cities => ({cities, type: SET_PM10_POLLUTION});
export const setSO2Pollution = cities => ({cities, type: SET_SO2_POLLUTION});
export const setNO2Pollution = cities => ({cities, type: SET_NO2_POLLUTION});
export const setTypePollution = value => ({value, type: SET_TYPE_POLLUTION});

//SELECTORS
export const getPollution = store => store.pollution;
