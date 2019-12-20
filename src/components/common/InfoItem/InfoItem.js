import React from 'react';
import PropTypes from 'prop-types';
import HtmlBox from '../../common/HtmlBox/HtmlBox';
import {Collapse, CardBody, Card} from 'reactstrap';
import './InfoItem.scss';

class InfoItem extends React.Component {
    state = {
        isOpen: false
    };

    componentDidMount() {
        const {i} = this.props;
        if (i === 0) this.setState({isOpen: true})
    }

    componentWillReceiveProps(nextProps) {
        const {i} = this.props;
        const {selectedItem} = nextProps;
        if (selectedItem !== i) this.setState({isOpen: false});
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

InfoItem.propTypes = {
    collapse: PropTypes.func.isRequired,
    i: PropTypes.number.isRequired,
    selectedItem: PropTypes.number.isRequired
};

export default InfoItem;
