import {SET_AVAILABLE_COUNTRIES, SET_SELECTED_COUNTRY} from "../actions/valuesActions";

const initialState = {
    countries: [],
    selectedCountry: {}
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AVAILABLE_COUNTRIES:
            return {...state, countries: action.countries};
        case SET_SELECTED_COUNTRY:
            return {...state, selectedCountry: action.country};
        default:
            return state;
    }
};

export default reducer;
