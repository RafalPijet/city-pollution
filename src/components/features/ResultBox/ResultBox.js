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
        const {loadCities, pollution} = this.props;
        this.toggle(1, 'Pm25');
        loadCities(pollution.pm25);
    }

    toggle = (tab, type) => {
        const {activeTab} = this.state;
        const {setTypePollution} = this.props;
        setTypePollution(type);
        if (activeTab !== tab) this.setState({activeTab: tab});
    };

    render() {
        const {pollution} = this.props;
        const {activeTab} = this.state;
        return (
            <div className='result-box-main'>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            onClick={() => this.toggle(1, 'Pm25')}
                            className={`${classnames({active: activeTab === 1})} btn`}>
                            {`Pm25`}
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            onClick={() => this.toggle(2, 'Pm10')}
                            className={`${classnames({active: activeTab === 2})} btn`}>
                            {`Pm10`}
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            onClick={() => this.toggle(3, 'So2')}
                            className={`${classnames({active: activeTab === 3})} btn`}>
                            {`S02`}
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            onClick={() => this.toggle(4, 'No2')}
                            className={`${classnames({active: activeTab === 4})} btn`}>
                            {`No2`}
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                    <TabPane tabId={1}>
                        <ResultList pollution={pollution.pm25} name='pm25' unit='µg/m³'/>
                    </TabPane>
                    <TabPane tabId={2}>
                        <ResultList pollution={pollution.pm10} name='pm10' unit='µg/m³'/>
                    </TabPane>
                    <TabPane tabId={3}>
                        <ResultList pollution={pollution.so2} name='so2' unit='µg/m³'/>
                    </TabPane>
                    <TabPane tabId={4}>
                        <ResultList pollution={pollution.no2} name='no2' unit='µg/m³'/>
                    </TabPane>
                </TabContent>
            </div>
        )
    }
}

ResultBox.propTypes = {
    pollution: PropTypes.object.isRequired,
    setTypePollution: PropTypes.func.isRequired,
    loadCities: PropTypes.func.isRequired
};

export default ResultBox
