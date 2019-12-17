import React from 'react';
import PropTypes from 'prop-types';
import Spinner from '../../common/Spinner/Spinner';
import Alert from '../../common/Alert/Alert';

class ContentBox extends React.Component {
    render() {
        const {request} = this.props;

        if (request.pending) {
            return <Spinner/>
        } else if (request.error !== null && !request.pending) {
            return (
                <Alert variant='error' isVisible={true}>{request.error}</Alert>
            )
        } else if (request.success) {
            return (
                <div>Done</div>
            )
        } else {
            return <div>Begin</div>
        }
    }
}

ContentBox.propTypes = {
    request: PropTypes.object.isRequired
};

export default ContentBox;
