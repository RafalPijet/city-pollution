import React from 'react';
import PropTypes from 'prop-types';
import InfoItem from '../../common/InfoItem/InfoItem';
import {sortByValue} from "../../../utilities/functions";

class InfoBox extends React.Component {
    state = {
        typePollution: 'Pm25',
        selectedItem: 0
    };

    componentWillReceiveProps(nextProps) {

        if (nextProps.pollution.type !== this.state.typePollution) {
            this.setState({typePollution: nextProps.pollution.type});
            this.setSelectedPollution(nextProps.pollution)
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
        return (
            <div>
                {cities.map((city, i) => {
                    return <InfoItem selectedItem={this.state.selectedItem} i={i} collapse={this.collapseHandling} key={i} city={city}/>
                })}
            </div>
        )
    }
}

InfoBox.propTypes = {
    loadCities: PropTypes.func.isRequired,
    request: PropTypes.object.isRequired,
    pollution: PropTypes.object.isRequired,
    cities: PropTypes.array.isRequired
};

export default InfoBox;
