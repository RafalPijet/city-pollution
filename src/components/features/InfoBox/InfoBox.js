import React from 'react';
import PropTypes from 'prop-types';
import HtmlBox from '../../common/HtmlBox/HtmlBox';

class InfoBox extends React.Component {
    componentDidMount() {
        // this.setSelectedPollution(this.props.pollution)
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.pollution.type && !nextProps.request.pending) {
            this.setSelectedPollution(nextProps.pollution)
        }
    }

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
        return (
            <div>Begin Info Box</div>
        )
    }
}

InfoBox.propTypes = {
    loadCities: PropTypes.func.isRequired,
    request: PropTypes.object.isRequired,
    pollution: PropTypes.object.isRequired
};

export default InfoBox;
