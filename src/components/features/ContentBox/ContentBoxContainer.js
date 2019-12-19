import {connect} from "react-redux";
import {getRequest} from "../../../redux/actions/requestActions";
import {getPollution, setTypePollution} from "../../../redux/actions/pullutionActions";
import {loadInfoCitiesRequest} from "../../../redux/thunks";
import ContentBox from './ContentBox';

const mapStateToProps = state => ({
    request: getRequest(state),
    pollution: getPollution(state)
});

const mapDispatchToProps = dispatch => ({
    setTypePollution: value => dispatch(setTypePollution(value)),
    loadCities: cities => dispatch(loadInfoCitiesRequest(cities))
});

export default connect(mapStateToProps, mapDispatchToProps)(ContentBox)

