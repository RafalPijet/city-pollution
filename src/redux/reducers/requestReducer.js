import {
    START_REQUEST,
    STOP_REQUEST,
    ERROR_REQUEST,
    RESET_REQUEST,
    START_WORKING_REQUEST,
    STOP_WORKING_REQUEST
} from "../actions/requestActions";

const initialState = {
    pending: false,
    error: null,
    success: null,
    info: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case START_REQUEST:
            return {...state, pending: true, error: null, success: null};
        case STOP_REQUEST:
            return {...state, pending: false, error: null, success: true};
        case ERROR_REQUEST:
            return {...state, pending: false, error: action.error, success: false, info: false};
        case RESET_REQUEST:
            return {...state, pending: false, error: null, success: null};
        case START_WORKING_REQUEST:
            return {...state, info: false};
        case STOP_WORKING_REQUEST:
            return {...state, info: true};
        default:
            return state
    }
};

export default reducer;
