import axios from 'axios';
import {startRequest, stopRequest, errorRequest, resetRequest} from "./actions/requestActions";

export const getPullutionDataRequest = () => {
    return async dispatch => {
        console.log('wow');
        try {
            let res = await axios.get(`https://api.openaq.org/v1/measurements?country=PL&parameter=pm25&limit=20&order_by=value&sort=desc`);
            console.log(res.data);
        } catch (err) {

        }
    }
};
