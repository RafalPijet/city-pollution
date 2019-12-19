import React from 'react';
import PropTypes from 'prop-types';
import ResultBox from '../ResultBox/ResultBox';
import InfoBox from '../InfoBox/InfoBoxContainer';
import Spinner from '../../common/Spinner/Spinner';
import Alert from '../../common/Alert/Alert';
import {Animated} from "react-animated-css";
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
        const {request, pollution, setTypePollution, loadCities} = this.props;

        if (request.pending) {
            return <Spinner/>
        } else if (request.error !== null && !request.pending) {
            return (
                <Alert variant='error' isVisible={true}>{request.error}</Alert>
            )
        } else if (request.success && this.state.isReady) {
            return (
                <div className='content-box-main'>
                    <div className='content-animated'>
                        <Animated
                            animationIn='flipInY'
                            animationOut='rubberBand'
                            animationInDelay={1000}
                            isVisible={this.state.isReady}>
                            <ResultBox loadCities={loadCities} pollution={pollution}
                                       setTypePollution={setTypePollution}/>
                        </Animated>
                    </div>
                    <InfoBox/>
                </div>
            )
        } else {
            return (
                <Animated
                    animationIn='fadeIn'
                    animationOut='rubberBand'
                    animationInDelay={2000}
                    isVisible={true}>
                    <div className='content-box-info'>
                        <p>Select a country</p>
                    </div>
                </Animated>
            )
        }
    }
}

ContentBox.propTypes = {
    request: PropTypes.object.isRequired,
    pollution: PropTypes.object.isRequired,
    setTypePollution: PropTypes.func.isRequired,
    loadCities: PropTypes.func.isRequired
};

export default ContentBox;
