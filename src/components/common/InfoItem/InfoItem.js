import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import HtmlBox from '../../common/HtmlBox/HtmlBox';
import {Collapse, CardBody, Card} from 'reactstrap';
import './InfoItem.scss';

const InfoItem = props => {
    const {i, selectedItem, collapse, city} = props;
    const [isOpen, setIsOpen] = useState(false);
    const [number, setNumber] = useState(0);

    useEffect(() => {
        setNumber(i);
        setIsOpen(selectedItem === number);
    }, [i, selectedItem, number]);

    const openHandling = () => {
        setIsOpen(true);
        collapse(number);
    };

    return (
        <div>
            <div className='info-header-row' onClick={openHandling}>
                <p className='info-header'>{city.name}</p>
            </div>
            <Collapse isOpen={isOpen}>
                <Card>
                    <CardBody className='info-item-body'>
                        <HtmlBox>{city.description.length !== 0 ? city.description :
                            '<p>Sorry, but description is not available!</p>'}</HtmlBox>
                    </CardBody>
                </Card>
            </Collapse>
        </div>
    )
};
/*
class InfoItem extends React.Component {
    state = {
        isOpen: false,
        number: 0
    };

    componentDidMount() {
        const {i} = this.props;
        this.setState({number: i});
        if (i === 0) this.setState({isOpen: true})
    }

    static getDerivedStateFromProps(props, state) {
        return {isOpen: props.selectedItem === state.number};
    }

    openHandling = () => {
        const {i, collapse} = this.props;
        this.setState({isOpen: true});
        collapse(i);
    };

    render() {
        const {city} = this.props;
        const {openHandling} = this;
        const {isOpen} = this.state;
        return (
            <div>
                <div className='info-header-row' onClick={openHandling}>
                    <p className='info-header'>{city.name}</p>
                </div>
                <Collapse isOpen={isOpen}>
                    <Card>
                        <CardBody className='info-item-body'>
                            <HtmlBox>{city.description.length !== 0 ? city.description :
                                '<p>Sorry, but description is not available!</p>'}</HtmlBox>
                        </CardBody>
                    </Card>
                </Collapse>
            </div>
        )
    }
}
*/
InfoItem.propTypes = {
    collapse: PropTypes.func.isRequired,
    i: PropTypes.number.isRequired,
    selectedItem: PropTypes.number.isRequired,
    city: PropTypes.object.isRequired
};

export default InfoItem;
