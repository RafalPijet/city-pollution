import {connect} from 'react-redux';
import InfoBox from './InfoBox';
import {loadInfoCitiesRequest} from "../../../redux/thunks";
import {getRequest} from "../../../redux/actions/requestActions";
import {getPollution} from "../../../redux/actions/pullutionActions";

const mapDispatchToProps = dispatch => ({
    loadCities: cities => dispatch(loadInfoCitiesRequest(cities))
});

const mapStateToProps = state => ({
    request: getRequest(state),
    pollution: getPollution(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(InfoBox);
