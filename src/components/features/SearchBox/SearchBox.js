import React from 'react';
import PropTypes from 'prop-types';
import './SearchBox.scss';
import Button from '../../common/Button/Button';
import {Animated} from "react-animated-css";
import {availableCountries} from "../../../utilities/functions";

class SearchBox extends React.Component {
    state = {
        name: '',
        check: true,
        isDisabled: true
    };

    componentDidMount() {
        const {setCountries} = this.props;
        setCountries(availableCountries);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {

        if (Object.keys(nextProps.country).length !== 0) {
            this.setState({check: true, isDisabled: true})
        }
    }

    checkAvailableCountry = (isForDisabled, name) => {
        const {countries} = this.props;

        if (isForDisabled) {
            let result = true;
            countries.forEach(item => {
                if (item.name === name) result = false;
            });
            return result
        } else {
            this.state.name.length === 0 ? this.setState({name: name.toUpperCase()}) :
                this.setState({name: name});
            if (this.state.check && this.state.name.length >= 1) {
                countries.forEach(item => {
                    if (item.name.includes(name)) {
                        this.setState({name: item.name, check: false});
                    }
                });
            } else if (this.state.name.length < 1) this.setState({check: true});
        }
    };

    nameHandling = async event => {
        const {request, resetRequest} = this.props;
        if (request.error !== null) resetRequest();
        await this.checkAvailableCountry(false, event.target.value);
        this.setState({isDisabled: this.checkAvailableCountry(true, this.state.name)});
    };

    selectCountry = event => {
        const {countries, resetRequest} = this.props;
        const {name} = this.state;
        const {loadData} = this;
        resetRequest();
        event.preventDefault();
        countries.forEach(item => {
            if (item.name === name) loadData(item);
        })
    };

    loadData = async country => {
        const {
            setCountry,
            loadPollution,
            setPM25Pollution,
            setPM10Pollution,
            setSO2Pollution,
            setNO2Pollution
        } = this.props;
        setPM25Pollution([]);
        setPM10Pollution([]);
        setSO2Pollution([]);
        setNO2Pollution([]);
        setCountry(country);
        await loadPollution(country, 'pm25');
        loadPollution(country, 'pm10');
        loadPollution(country, 'so2');
        loadPollution(country, 'no2');
    };

    render() {
        const {nameHandling, selectCountry} = this;
        const {name, isDisabled} = this.state;
        return (
            <Animated
                animationIn='jackInTheBox'
                isVisible={true}>
                <form className='search-box-main' onSubmit={selectCountry}>
                    <div className='search-box-select'>
                        <input
                            type="text"
                            value={name}
                            onClick={() => this.setState({name: ''})}
                            onChange={nameHandling}/>
                        <Button disabled={isDisabled} variant={isDisabled ? "danger" : "success"}>Select</Button>
                    </div>
                </form>
            </Animated>
        )
    }
}

SearchBox.propTypes = {
    setCountries: PropTypes.func.isRequired,
    setCountry: PropTypes.func.isRequired,
    countries: PropTypes.array.isRequired,
    country: PropTypes.object.isRequired,
    loadPollution: PropTypes.func.isRequired,
    resetRequest: PropTypes.func.isRequired,
    request: PropTypes.object.isRequired,
    setPM25Pollution: PropTypes.func.isRequired,
    setPM10Pollution: PropTypes.func.isRequired,
    setSO2Pollution: PropTypes.func.isRequired,
    setNO2Pollution: PropTypes.func.isRequired
};

export default SearchBox;
