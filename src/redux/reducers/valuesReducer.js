import {SET_AVAILABLE_COUNTRIES} from "../actions/valuesActions";

const initialState = {
    countries: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AVAILABLE_COUNTRIES:
            return {...state, countries: action.countries};
        default:
            return state;
    }
};

export default reducer;
