import React from 'react';
import PropTypes from 'prop-types';
import './SearchBox.scss';
import Button from '../../common/Button/Button';
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

    componentWillReceiveProps(nextProps) {

        if (Object.keys(nextProps.country).length !== 0) {
            this.setState({name: '', check: true, isDisabled: true})
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
        await this.checkAvailableCountry(false, event.target.value);
        this.setState({isDisabled: this.checkAvailableCountry(true, this.state.name)});
    };

    selectCountry = event => {
        const {countries, setCountry} = this.props;
        const {name} = this.state;
        event.preventDefault();
        countries.forEach(item => {
            if (item.name === name) setCountry(item)
        })
    };

    render() {
        const {nameHandling, selectCountry} = this;
        const {name, isDisabled} = this.state;
        return (
            <form className='search-box-main' onSubmit={selectCountry}>
                <input type="text" value={name} onChange={nameHandling}/>
                <Button disabled={isDisabled} variant={isDisabled ? "danger" : "success"}>Select</Button>
            </form>
        )
    }
}

SearchBox.propTypes = {
    setCountries: PropTypes.func.isRequired,
    setCountry: PropTypes.func.isRequired,
    countries: PropTypes.array.isRequired,
    country: PropTypes.object.isRequired
};

export default SearchBox;
