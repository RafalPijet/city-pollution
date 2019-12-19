import React from 'react';
import PropTypes from 'prop-types';
import InfoItem from '../../common/InfoItem/InfoItem';
import {sortByValue} from "../../../utilities/functions";
import Spinner from '../../common/Spinner/Spinner';
import {Animated} from "react-animated-css";
import './InfoBox.scss';

class InfoBox extends React.Component {
    state = {
        typePollution: 'Pm25',
        selectedItem: 0,
        isWorking: false,
        isInfo: false
    };

    componentWillReceiveProps(nextProps) {

        if (nextProps.pollution.type !== this.state.typePollution) {
            this.setState({typePollution: nextProps.pollution.type, selectedItem: 0});
            this.setSelectedPollution(nextProps.pollution)
        }
        this.setState({
            isWorking: nextProps.request.working,
            isInfo: nextProps.request.info
        })
    }

    collapseHandling = index => {
        this.setState({selectedItem: index})
    };

    setSelectedPollution = pollution => {
        const {loadCities} = this.props;
        switch (pollution.type) {
            case 'Pm25':
                loadCities(pollution.pm25);
                break;
            case 'Pm10':
                loadCities(pollution.pm10);
                break;
            case 'So2':
                loadCities(pollution.so2);
                break;
            case 'No2':
                loadCities(pollution.no2);
                break;
            default:
        }
    };

    render() {
        let cities = this.props.cities.sort(sortByValue);
        const {isWorking, isInfo} = this.state;

        if (isWorking && !isInfo) {
            return (
                <div className='info-box-spinner'>
                    <Spinner/>
                </div>
            )
        } else if (isInfo) {
            return (
                <div className='info-box-main'>
                    <Animated animationIn='flipInY'
                              animationOut='rubberBand'
                              animationInDelay={1000}
                              isVisible={isInfo}>
                        {cities.map((city, i) => {
                            return <InfoItem selectedItem={this.state.selectedItem} i={i}
                                             collapse={this.collapseHandling} key={i} city={city}/>
                        })}
                    </Animated>
                </div>
            )
        } else {
            return (
                <div className='info-box-spinner'>
                    <p>Cities description</p>
                </div>
            )
        }
    }
}

InfoBox.propTypes = {
    loadCities: PropTypes.func.isRequired,
    request: PropTypes.object.isRequired,
    pollution: PropTypes.object.isRequired,
    cities: PropTypes.array.isRequired
};

export default InfoBox;
