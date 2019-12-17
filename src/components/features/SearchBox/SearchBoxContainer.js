import {connect} from "react-redux";
import {
    setAvailableCountries,
    getAvailableCountries,
    setSelectedCountry,
    getSelectedCountry
} from "../../../redux/actions/valuesActions";
import {resetRequest, getRequest} from "../../../redux/actions/requestActions";
import {loadPullutionDataRequest} from "../../../redux/thunks";
import SearchBox from './SearchBox';

const mapDispatchToProps = dispatch => ({
    setCountries: countries => dispatch(setAvailableCountries(countries)),
    setCountry: country => dispatch(setSelectedCountry(country)),
    loadPollution: (country, type) => dispatch(loadPullutionDataRequest(country, type)),
    resetRequest: () => dispatch(resetRequest())
});

const mapStateToProps = state => ({
    countries: getAvailableCountries(state),
    country: getSelectedCountry(state),
    request: getRequest(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
