import React from 'react';
import PropTypes from 'prop-types';
import ResultBox from '../ResultBox/ResultBox';
import InfoBox from '../InfoBox/InfoBoxContainer';
import Spinner from '../../common/Spinner/Spinner';
import Alert from '../../common/Alert/Alert';
import './ContentBox.scss';

class ContentBox extends React.Component {
    state = {
        isReady: false
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.pollution.pm25.length !== 0 && nextProps.pollution.pm10.length !== 0 &&
            nextProps.pollution.so2.length !== 0 && nextProps.pollution.no2.length !== 0) {
            this.setState({isReady: true})
        }
    }

    render() {
        const {request, pollution, setTypePollution} = this.props;

        if (request.pending) {
            return <Spinner/>
        } else if (request.error !== null && !request.pending) {
            return (
                <Alert variant='error' isVisible={true}>{request.error}</Alert>
            )
        } else if (request.success && this.state.isReady) {
            return (
                <div className='content-box-main'>
                    <ResultBox pollution={pollution} setTypePollution={setTypePollution}/>
                    <InfoBox/>
                </div>
            )
        } else {
            return <div>Begin</div>
        }
    }
}

ContentBox.propTypes = {
    request: PropTypes.object.isRequired,
    pollution: PropTypes.object.isRequired,
    setTypePollution: PropTypes.func.isRequired
};

export default ContentBox;
