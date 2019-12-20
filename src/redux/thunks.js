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
        await dispatch(setCitiesOfCountry([]));
        await dispatch(startWorkingRequest());

        cities.forEach(async item => {
            try {
                let res = await axios.get(`${CORS}${WIKI_URL}?action=query&prop=extracts&format=json&exintro=&titles=${item.name}`);
                let city = {
                    name: res.data.query.pages[Object.keys(res.data.query.pages)].title,
                    description: (res.data.query.pages[Object.keys(res.data.query.pages)].extract === undefined) ? "" :
                        res.data.query.pages[Object.keys(res.data.query.pages)].extract,
                    value: item.value
                };
                dispatch(addCityOfCountry(city));
            } catch (err) {
                dispatch(errorRequest(err.message))
            }
        });
        dispatch(stopWorkingRequest());

    }
};
