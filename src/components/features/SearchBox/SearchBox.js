import React, {Fragment, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import './SearchBox.scss';
import Button from '../../common/Button/Button';
import {Animated} from "react-animated-css";
import {availableCountries} from "../../../utilities/functions";

const SearchBox = props => {
    const {
        setCountries,
        countries,
        resetRequest,
        setCountry,
        loadPollution,
        setPM25Pollution,
        setPM10Pollution,
        setSO2Pollution,
        setNO2Pollution,
        country
    } = props;
    const [isDisabled, setIsDisabled] = useState(true);
    const [activeSuggestion, setActiveSuggestion] = useState(0);
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [userInput, setUserInput] = useState("");
    const [inputPlaceholder, setInputPlaceholder] = useState("Country");

    useEffect(() => {
        if (country.name.length) setInputPlaceholder(country.name);
        setCountries(availableCountries)
    }, [setCountries, country.name]);

    const onChange = e => {
        const userInput = e.currentTarget.value;
        const filteredSuggestions = countries.filter(suggestion =>
            suggestion.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        );
        setActiveSuggestion(0);
        setFilteredSuggestions(filteredSuggestions);
        setShowSuggestions(true);
        setUserInput(e.currentTarget.value);
        setIsDisabled(checkAvailableCountry(e.currentTarget.value));
    };

    const onClick = e => {
        setActiveSuggestion(0);
        setFilteredSuggestions([]);
        setShowSuggestions(false);
        setUserInput(e.currentTarget.innerText);
        setIsDisabled(checkAvailableCountry(e.currentTarget.innerText));
    };

    const onKeyDown = e => {
        if (e.keyCode === 13 && userInput.length !== 0) {
            if (filteredSuggestions.length) {
                setActiveSuggestion(0);
                setShowSuggestions(false);
                setFilteredSuggestions([]);
                setUserInput(filteredSuggestions[activeSuggestion].name);
                setIsDisabled(checkAvailableCountry(filteredSuggestions[activeSuggestion].name));
            }
        } else if (e.keyCode === 38) {
            if (activeSuggestion === 0) {
                return;
            }
            setActiveSuggestion(activeSuggestion - 1);
        } else if (e.keyCode === 40) {
            if (activeSuggestion + 1 === filteredSuggestions.length) {
                return;
            }
            setActiveSuggestion(activeSuggestion + 1);
        }
    };

    const checkAvailableCountry = name => {
        let result = true;
        countries.forEach(country => {
            if (country.name.toLowerCase() === name.toLowerCase()) result = false
        });
        return result;
    };

    const resetState = () => {
        setIsDisabled(true);
        setActiveSuggestion(0);
        setFilteredSuggestions([]);
        setShowSuggestions(false);
        setUserInput("");
    };

    const selectCountry = () => {
        resetRequest();
        if (!checkAvailableCountry(userInput)) {
            countries.forEach(country => {
                if (country.name === userInput) loadData(country)
            })
        }
        setIsDisabled(true);
    };

    const loadData = async country => {
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
            <div className='search-box-main' onSubmit={selectCountry}>
                <div className='search-box-select'>
                    <Fragment>
                        <div className='input-box'>
                            <input
                                type="text"
                                onChange={onChange}
                                onKeyDown={onKeyDown}
                                onClick={resetState}
                                placeholder={inputPlaceholder}
                                value={userInput}/>
                            {suggestionsListComponent}
                        </div>
                    </Fragment>
                    <Button
                        disabled={isDisabled} variant={isDisabled ? 'danger' : 'success'}
                        onClick={selectCountry}
                    >Select</Button>
                </div>
            </div>
        </Animated>
    )
};

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
