import {connect} from "react-redux";
import {
    setAvailableCountries,
    getAvailableCountries,
    setSelectedCountry,
    getSelectedCountry
} from "../../../redux/actions/valuesActions";
import {resetRequest, getRequest} from "../../../redux/actions/requestActions";
import {loadPullutionDataRequest} from "../../../redux/thunks";
import {
    setPM25Pollution,
    setPM10Pollution,
    setSO2Pollution,
    setNO2Pollution
} from "../../../redux/actions/pullutionActions";
import SearchBox from './SearchBox';

const mapDispatchToProps = dispatch => ({
    setCountries: countries => dispatch(setAvailableCountries(countries)),
    setCountry: country => dispatch(setSelectedCountry(country)),
    loadPollution: (country, type) => dispatch(loadPullutionDataRequest(country, type)),
    resetRequest: () => dispatch(resetRequest()),
    setPM25Pollution: cities => dispatch(setPM25Pollution(cities)),
    setPM10Pollution: cities => dispatch(setPM10Pollution(cities)),
    setSO2Pollution: cities => dispatch(setSO2Pollution(cities)),
    setNO2Pollution: cities => dispatch(setNO2Pollution(cities)),
});

const mapStateToProps = state => ({
    countries: getAvailableCountries(state),
    country: getSelectedCountry(state),
    request: getRequest(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
