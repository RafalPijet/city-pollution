import axios from 'axios';
import {OPENAQ_URL, CORS, WIKI_URL} from "../config";
import {
    startRequest,
    stopRequest,
    errorRequest,
    startWorkingRequest,
    stopWorkingRequest
} from "./actions/requestActions";
import {setPM25Pollution, setPM10Pollution, setSO2Pollution, setNO2Pollution} from "./actions/pullutionActions";
import {addCityOfCountry, setCitiesOfCountry} from "./actions/valuesActions";
import {transformData} from "../utilities/functions";

export const loadPullutionDataRequest = (country, type) => {
    return async dispatch => {
        await dispatch(startRequest());

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            let res = await axios.get(`${OPENAQ_URL}?country=${country.country}&parameter=${type}&limit=200&order_by=value&sort=desc`);

            switch (type) {
                case 'pm25':
                    dispatch(setPM25Pollution(transformData(res.data.results)));
                    break;
                case 'pm10':
                    dispatch(setPM10Pollution(transformData(res.data.results)));
                    break;
                case 'so2':
                    dispatch(setSO2Pollution(transformData(res.data.results)));
                    break;
                case 'no2':
                    dispatch(setNO2Pollution(transformData(res.data.results)));
                    break;
                default:
            }
            dispatch(stopRequest());
        } catch (err) {
            dispatch(errorRequest(err.message))
        }
    }
};

export const loadInfoCitiesRequest = cities => {
    return async dispatch => {
        dispatch(startWorkingRequest());
        console.log('wow');
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            await dispatch(setCitiesOfCountry([]));
            cities.forEach(async item => {
                let res = await axios.get(`${CORS}${WIKI_URL}?action=query&prop=extracts&format=json&exintro=&titles=${item.name}`);
                let city = {
                    name: res.data.query.pages[Object.keys(res.data.query.pages)].title,
                    description: res.data.query.pages[Object.keys(res.data.query.pages)].extract,
                    value: item.value
                };
                dispatch(addCityOfCountry(city));
            });
            dispatch(stopWorkingRequest());
        } catch (err) {
            dispatch(errorRequest(err.message))
        }
    }
};
