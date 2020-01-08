import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import ResultBox from '../ResultBox/ResultBox';
import InfoBox from '../InfoBox/InfoBoxContainer';
import Spinner from '../../common/Spinner/Spinner';
import Alert from '../../common/Alert/Alert';
import {Animated} from "react-animated-css";
import './ContentBox.scss';

const ContentBox = props => {
    const [isReady, setIsReady] = useState(false);
    const {request, pollution, setTypePollution} = props;

    useEffect(() => {
        if (pollution.pm25.length === 10 && pollution.pm10.length === 10 &&
            pollution.so2.length === 10 && pollution.no2.length === 10) {
            setIsReady(true)
        }
        return () => {
            setIsReady(false)
        }
    }, [pollution]);

    if (request.pending) {
        return <Spinner/>
    } else if (request.error !== null && !request.pending) {
        return (
            <Alert variant='error' isVisible={true}>{request.error}</Alert>
        )
    } else if (request.success && isReady) {
        return (
            <div className='content-box-main'>
                <div className='content-animated'>
                    <Animated
                        animationIn='flipInY'
                        isVisible={isReady}>
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
};

ContentBox.propTypes = {
    request: PropTypes.object.isRequired,
    pollution: PropTypes.object.isRequired,
    setTypePollution: PropTypes.func.isRequired
};

export default ContentBox;
