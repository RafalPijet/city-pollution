import {
    SET_AVAILABLE_COUNTRIES,
    SET_SELECTED_COUNTRY,
    SET_CITIES_OF_COUNTRY
} from "../actions/valuesActions";

const initialState = {
    countries: [],
    selectedCountry: {},
    citiesOfCountry: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AVAILABLE_COUNTRIES:
            return {...state, countries: action.countries};
        case SET_SELECTED_COUNTRY:
            return {...state, selectedCountry: action.country};
        case SET_CITIES_OF_COUNTRY:
            return {...state, citiesOfCountry: action.cities};
        default:
            return state;
    }
};

export default reducer;
