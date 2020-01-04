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

    static getDerivedStateFromProps(props) {
        if (props.pollution.pm25.length === 10 && props.pollution.pm10.length === 10 &&
            props.pollution.so2.length === 10 && props.pollution.no2.length === 10) {
            return {
                isReady: true
            }
        }
        return null;
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
                    <div className='content-animated'>
                        <Animated
                            animationIn='flipInY'
                            isVisible={this.state.isReady}>
                            <ResultBox pollution={pollution}
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
    setTypePollution: PropTypes.func.isRequired
};

export default ContentBox;
