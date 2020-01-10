import {connect} from "react-redux";
import {getRequest} from "../../../redux/actions/requestActions";
import {getPollution, setTypePollution} from "../../../redux/actions/pullutionActions";
import {getSelectedCountry} from "../../../redux/actions/valuesActions";
import ContentBox from './ContentBox';

const mapStateToProps = state => ({
    request: getRequest(state),
    pollution: getPollution(state),
    country: getSelectedCountry(state)
});

const mapDispatchToProps = dispatch => ({
    setTypePollution: value => dispatch(setTypePollution(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(ContentBox)

