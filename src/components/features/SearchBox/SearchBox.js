import React from 'react';
import PropTypes from 'prop-types';
import './SearchBox.scss';
import Button from '../../common/Button/Button';
import {availableCountries} from "../../../utilities/functions";

class SearchBox extends React.Component {
    state = {
        name: ''
    };

    componentDidMount() {
        const {setCountries} = this.props;
        setCountries(availableCountries);
    }

    nameHandling = event => {
        this.setState({name: event.target.value});
    };
    render() {
        const {nameHandling} = this;
        const {name} = this.state;
        return (
            <div className='search-box-main'>
                <input type="text" value={name} onChange={nameHandling}/>
                <Button variant="primary">Search</Button>
            </div>
        )
    }
}

SearchBox.propTypes = {
    setCountries: PropTypes.func.isRequired,
    countries: PropTypes.array.isRequired
};

export default SearchBox;
