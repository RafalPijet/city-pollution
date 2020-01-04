import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import './SearchBox.scss';
import Button from '../../common/Button/Button';
import {Animated} from "react-animated-css";
import {availableCountries} from "../../../utilities/functions";

class SearchBox extends React.Component {
    state = {
        name: '',
        check: false,
        isDisabled: true,
        activeSuggestion: 0,
        filteredSuggestions: [],
        showSuggestions: false,
        userInput: ""
    };

    componentDidMount() {
        const {setCountries} = this.props;
        setCountries(availableCountries);
    }

    onChange = e => {
        const {countries} = this.props;
        const {checkAvailableCountry} = this;
        const userInput = e.currentTarget.value;
        const filteredSuggestions = countries.filter(suggestion =>
            suggestion.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        );
        this.setState({
            activeSuggestion: 0,
            filteredSuggestions,
            showSuggestions: true,
            userInput: e.currentTarget.value
        });
        this.setState({isDisabled: checkAvailableCountry(e.currentTarget.value)});
    };

    onClick = e => {
        this.setState({
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: e.currentTarget.innerText
        })
    };

    onKeyDown = e => {
        const {activeSuggestion, filteredSuggestions} = this.state;

        if (e.keyCode === 13) {
            console.log(filteredSuggestions.length + " --- " + activeSuggestion);
            this.setState({
                activeSuggestion: 0,
                showSuggestions: false,
                userInput: filteredSuggestions.length ? filteredSuggestions[activeSuggestion].name : '',
                isDisabled: filteredSuggestions.length ?
                    this.checkAvailableCountry(filteredSuggestions[activeSuggestion].name) : true
            });
        } else if (e.keyCode === 38) {
            if (activeSuggestion === 0) {
                return;
            }
            this.setState({activeSuggestion: activeSuggestion - 1});
        } else if (e.keyCode === 40) {
            if (activeSuggestion - 1 === filteredSuggestions.length) {
                return;
            }
            this.setState({activeSuggestion: activeSuggestion + 1});
        }
    };

    checkAvailableCountry =  name => {
        const {countries} = this.props;
        let result = true;
        countries.forEach(country => {
            if (country.name.toLowerCase() === name.toLowerCase()) result = false
        });
        return result;
    };

    selectCountry = event => {
        const {countries, resetRequest} = this.props;
        const {userInput} = this.state;
        const {loadData} = this;
        // resetRequest();
        event.preventDefault();
        if (!this.checkAvailableCountry(userInput)) console.log(this.state.userInput);
        // countries.forEach(item => {
        //     if (item.name === name) loadData(item);
        // });
        // this.setState({isDisabled: true, check: true})
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
        const {
            onChange,
            onClick,
            onKeyDown,
            selectCountry,
            state: {
                activeSuggestion,
                filteredSuggestions,
                showSuggestions,
                userInput,
                isDisabled
            }
        } = this;

        let suggestionsListComponent;

        if (showSuggestions && userInput) {
            if (filteredSuggestions.length) {
                suggestionsListComponent = (
                    <ul className="suggestions">
                        {filteredSuggestions.map((suggestion, index) => {
                            let className;
                            if (activeSuggestion === index) {
                                className = "suggestion-active";
                            }

                            return (
                                <li
                                    className={className}
                                    key={suggestion.name}
                                    onClick={onClick}>
                                    {suggestion.name}
                                </li>
                            );
                        })}
                    </ul>
                )
            } else {
                suggestionsListComponent = (
                    <div className='no-suggestions'>
                        <em>No suggestions!</em>
                    </div>
                );
            }
        }

        return (
            <Animated
                animationIn='jackInTheBox'
                isVisible={true}>
                <form className='search-box-main' onSubmit={selectCountry}>
                    <div className='search-box-select'>
                        <Fragment>
                            <div className='input-box'>
                                <input
                                    type="text"
                                    onChange={onChange}
                                    onKeyDown={onKeyDown}
                                    value={userInput}/>
                                {suggestionsListComponent}
                            </div>
                        </Fragment>
                        <Button disabled={isDisabled} variant={isDisabled ? 'danger' : 'success'}>Select</Button>
                    </div>
                </form>
            </Animated>

        )
    }

    /*
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
        }*/
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
