import {connect} from "react-redux";
import {
    setAvailableCountries,
    getAvailableCountries,
    setSelectedCountry,
    getSelectedCountry
} from "../../../redux/actions/valuesActions";
import SearchBox from './SearchBox';

const mapDispatchToProps = dispatch => ({
    setCountries: countries => dispatch(setAvailableCountries(countries)),
    setCountry: country => dispatch(setSelectedCountry(country))
});

const mapStateToProps = state => ({
    countries: getAvailableCountries(state),
    country: getSelectedCountry(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
