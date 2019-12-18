import {connect} from "react-redux";
import {getRequest} from "../../../redux/actions/requestActions";
import {getPollution} from "../../../redux/actions/pullutionActions";
import ContentBox from './ContentBox';

const mapStateToProps = state => ({
    request: getRequest(state),
    pollution: getPollution(state)
});

export default connect(mapStateToProps)(ContentBox)

