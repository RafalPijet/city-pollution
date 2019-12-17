import {connect} from "react-redux";
import {setAvailableCountries, getAvailableCountries} from "../../../redux/actions/valuesActions";
import SearchBox from './SearchBox';

const mapDispatchToProps = dispatch => ({
    setCountries: countries => dispatch(setAvailableCountries(countries))
});

const mapStateToProps = state => ({
    countries: getAvailableCountries(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
