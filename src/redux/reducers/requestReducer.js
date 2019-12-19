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
    working: false,
    info: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case START_REQUEST:
            return {...state, pending: true, error: null, success: null};
        case STOP_REQUEST:
            return {...state, pending: false, error: null, success: true};
        case ERROR_REQUEST:
            return {...state, pending: false, error: action.error, success: false, working: false, info: false};
        case RESET_REQUEST:
            return {...state, pending: false, error: null, success: null, working: false, info: false};
        case START_WORKING_REQUEST:
            return {...state, working: true, info: false};
        case STOP_WORKING_REQUEST:
            return {...state, working: false, info: true};
        default:
            return state
    }
};

export default reducer;
