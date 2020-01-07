import React from 'react';
import PropTypes from 'prop-types';
import {TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';
import classnames from 'classnames';
import ResultList from '../../common/ResultList/ResultList';
import './ResultBox.scss';

class ResultBox extends React.Component {
    state = {
        activeTab: 1
    };

    componentDidMount() {
        this.toggle(1, 'Pm25');
    }

    toggle = (tab, type) => {
        const {activeTab} = this.state;
        const {setTypePollution} = this.props;
        setTypePollution(type);
        if (activeTab !== tab) this.setState({activeTab: tab});
    };

    componentWillUnmount() {
        this.props.setTypePollution('');
    }

    render() {
        const {pollution} = this.props;
        const {activeTab} = this.state;
        return (
            <div className='result-box-main'>
                <Nav tabs>
                    {Array.from(Object.keys(pollution)).slice(0, 4).map((item, i) => {
                        return (
                            <NavItem key={i}>
                                <NavLink
                                    onClick={() => this.toggle(i + 1,
                                        `${item.charAt(0).toUpperCase()}${item.substring(1, item.length)}`)}
                                    className={`${classnames({active: activeTab === i + 1})} btn`}>
                                    {`${item.charAt(0).toUpperCase()}${item.substring(1, item.length)}`}
                                </NavLink>
                            </NavItem>
                        )
                    })}
                </Nav>
                <TabContent activeTab={activeTab}>
                    {Object.entries(pollution).slice(0, 4).map((item, i) => {
                        return (
                            <TabPane key={i} tabId={i + 1}>
                                <ResultList pollution={item[1]} name={item[0]} unit='µg/m³'/>
                            </TabPane>
                        )
                    })}
                </TabContent>
            </div>
        )
    }
}

ResultBox.propTypes = {
    pollution: PropTypes.object.isRequired,
    setTypePollution: PropTypes.func.isRequired
};

export default ResultBox
