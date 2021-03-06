import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import InfoItem from '../../common/InfoItem/InfoItem';
import {sortByValue} from "../../../utilities/functions";
import Spinner from '../../common/Spinner/Spinner';
import {Animated} from "react-animated-css";
import './InfoBox.scss';

const InfoBox = props => {
    const {pollution, request, cities, loadCities} = props;
    const [typePollution, setTypePollution] = useState('');
    const [selectedItem, setSelectedItem] = useState(0);
    const [isInfo, setIsInfo] = useState(false);

    useEffect(() => {
        if (pollution.type !== typePollution) {
            setTypePollution(pollution.type);
            setSelectedItem(0);
        }
        setIsInfo(request.info)
    }, [pollution, request, typePollution]);

    useEffect(() => {
        if (pollution.type !== typePollution) {
            setSelectedPollution(pollution);
        }
    });

    const collapseHandling = index => {
        setSelectedItem(index);
    };

    const setSelectedPollution = pollution => {
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

    let citiesAfterSort = cities.sort(sortByValue);
    if (citiesAfterSort.length < 10) {
        return (
            <div className='info-box-spinner'>
                <Spinner/>
            </div>
        )
    } else if (isInfo && citiesAfterSort.length === 10) {
        return (
            <div className='info-box-main'>
                <Animated animationIn='flipInY'
                          isVisible={isInfo && citiesAfterSort.length === 10}>
                    {citiesAfterSort.map((city, i) => {
                        return <InfoItem selectedItem={selectedItem} i={i}
                                         collapse={collapseHandling} key={i} city={city}/>
                    })}
                </Animated>
            </div>
        )
    } else {
        return (
            <div className='info-box-spinner'>
                <p className='text-center'>Cities description</p>
            </div>
        )
    }
};
/*
class InfoBox extends React.Component {
    state = {
        typePollution: '',
        selectedItem: 0,
        isInfo: false
    };

    static getDerivedStateFromProps(props, state) {

        if (props.pollution.type !== state.typePollution) {
            return {
                typePollution: props.pollution.type,
                selectedItem: 0
            }
        }
        return {
            isInfo: props.request.info
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {pollution} = this.props;

        if (prevState.typePollution !== this.state.typePollution) {
            this.setSelectedPollution(pollution);
        }
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
        const {isInfo} = this.state;
        if (cities.length < 10) {
            return (
                <div className='info-box-spinner'>
                    <Spinner/>
                </div>
             )
         } else if (isInfo && cities.length === 10) {
            return (
                <div className='info-box-main'>
                    <Animated animationIn='flipInY'
                              isVisible={isInfo && cities.length === 10}>
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
                    <p className='text-center'>Cities description</p>
                </div>
            )
        }
    }
}
*/
InfoBox.propTypes = {
    loadCities: PropTypes.func.isRequired,
    request: PropTypes.object.isRequired,
    pollution: PropTypes.object.isRequired,
    cities: PropTypes.array.isRequired
};

export default InfoBox;
