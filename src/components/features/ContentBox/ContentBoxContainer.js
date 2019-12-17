import {connect} from "react-redux";
import {getRequest} from "../../../redux/actions/requestActions";
import ContentBox from './ContentBox';

const mapStateToProps = state => ({
    request: getRequest(state)
});

export default connect(mapStateToProps)(ContentBox)

