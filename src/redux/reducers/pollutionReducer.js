import {
    SET_PM25_POLLUTION,
    SET_PM10_POLLUTION,
    SET_SO2_POLLUTION,
    SET_NO2_POLLUTION
} from "../actions/pullutionActions";

const initialState = {
    pm25: [],
    pm10: [],
    so2: [],
    no2: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PM25_POLLUTION:
            return {...state, pm25: action.cities};
        case SET_PM10_POLLUTION:
            return {...state, pm10: action.cities};
        case SET_SO2_POLLUTION:
            return {...state, so2: action.cities};
        case SET_NO2_POLLUTION:
            return {...state, no2: action.cities};
        default:
            return state;
    }
};

export default reducer;
