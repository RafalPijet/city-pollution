import React, {Fragment, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import ZIndex from 'react-z-index';
import {Link, useRouteMatch, Switch, Route, useLocation} from 'react-router-dom';
import './SearchBox.scss';
import Button from '../../common/Button/Button';
import ContentBox from "../ContentBox/ContentBoxContainer";
import {Animated} from "react-animated-css";
import {availableCountries, availablePollution} from "../../../utilities/functions";

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
        setTypePollution,
        country,
        pollution
    } = props;
    const [isDisabled, setIsDisabled] = useState(true);
    const [activeSuggestion, setActiveSuggestion] = useState(0);
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [userInput, setUserInput] = useState("");
    const [inputPlaceholder, setInputPlaceholder] = useState("Country");
    const [isUrl, setIsUrl] = useState(true);

    let location = useLocation();

    useEffect(() => {
        if (country.name.length) setInputPlaceholder(country.name);
        setCountries(availableCountries);
    }, [setCountries, country]);

    useEffect(() => {
        if (location.pathname.length > 10 && userInput.length === 0 && isUrl &&
            !checkAvailableCountry(availableCountries, location.pathname.substring(11, location.pathname.lastIndexOf('/')))) {
            let pollutionType = location.pathname.substring(location.pathname.lastIndexOf('/') + 1, location.pathname.length);
            let country = availableCountries.find(
                item => item.name === location.pathname.substring(11, location.pathname.lastIndexOf('/')));
            if (country.name.length && availablePollution.includes(pollutionType)) {
                loadData(country);
                setTypePollution(pollutionType);
                setIsUrl(false);
            }
        }
    }, [location, userInput, setTypePollution, isUrl]);

    useEffect(() => {
        return () => {
            setCountry({country: "", name: ""});
        }
    }, [setCountry]);

    const onChange = e => {
        const userInput = e.currentTarget.value;
        const filteredSuggestions = countries.filter(suggestion =>
            suggestion.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        );
        setActiveSuggestion(0);
        setFilteredSuggestions(filteredSuggestions);
        setShowSuggestions(true);
        setUserInput(e.currentTarget.value);
        setIsDisabled(checkAvailableCountry(countries, e.currentTarget.value));
        setIsUrl(false);
    };

    const onClick = e => {
        setActiveSuggestion(0);
        setFilteredSuggestions([]);
        setShowSuggestions(false);
        setUserInput(e.currentTarget.innerText);
        setIsDisabled(checkAvailableCountry(countries, e.currentTarget.innerText));
    };

    const onKeyDown = e => {
        if (e.keyCode === 13 && userInput.length !== 0) {
            if (filteredSuggestions.length) {
                setActiveSuggestion(0);
                setShowSuggestions(false);
                setFilteredSuggestions([]);
                setUserInput(filteredSuggestions[activeSuggestion].name);
                setIsDisabled(checkAvailableCountry(countries, filteredSuggestions[activeSuggestion].name));
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

    const checkAvailableCountry = (countries, name) => {
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
        setUserInput('');
    };

    const selectCountry = () => {
        resetRequest();
        if (!checkAvailableCountry(countries, userInput)) {
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
    let {path} = useRouteMatch();
    return (
        <Animated
            animationIn={'jackInTheBox'}
            isVisible={true}>
            <ZIndex index={10}>
                <div className='search-box-main'>
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
                        <Link to={`/countries/${userInput}/${pollution.type}`} onClick={selectCountry} disabled={isDisabled}>
                            <Button
                                disabled={isDisabled} variant={isDisabled ? 'danger' : 'success'}
                            >Select</Button>
                        </Link>
                    </div>
                </div>
            </ZIndex>
            <Animated
                animationIn='fadeIn'
                animationInDelay={2000}
                isVisible={country.name.length === 0}>
                <div hidden={country.name.length !== 0} className='select-country'>
                    <p>Select a country</p>
                </div>
            </Animated>
            <Switch>
                <Route path={`${path}/:name/:type`}>
                    <ZIndex index={1}>
                        <ContentBox/>
                    </ZIndex>
                </Route>
            </Switch>
        </Animated>
    )
};

SearchBox.propTypes = {
    setCountries: PropTypes.func.isRequired,
    setCountry: PropTypes.func.isRequired,
    countries: PropTypes.array.isRequired,
    country: PropTypes.object.isRequired,
    pollution: PropTypes.object.isRequired,
    loadPollution: PropTypes.func.isRequired,
    resetRequest: PropTypes.func.isRequired,
    request: PropTypes.object.isRequired,
    setPM25Pollution: PropTypes.func.isRequired,
    setPM10Pollution: PropTypes.func.isRequired,
    setSO2Pollution: PropTypes.func.isRequired,
    setNO2Pollution: PropTypes.func.isRequired,
    setTypePollution: PropTypes.func.isRequired
};

export default SearchBox;
