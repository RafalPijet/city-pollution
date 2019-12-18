import React from 'react';
import PropTypes from 'prop-types';
import {TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';
import classnames from 'classnames';
import ResultList from '../../common/ResultList/ResultList';

class ResultBox extends React.Component {
    state = {
        activeTab: 1
    };

    componentDidMount() {
        this.toggle(1)
    }

    toggle = tab => {
        const {activeTab} = this.state;
        if (activeTab !== tab) this.setState({activeTab: tab});
    };

    render() {
        const {pollution} = this.props;
        const {activeTab} = this.state;
        return (
            <div>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            onClick={() => this.toggle(1)}
                            className={`${classnames({active: activeTab === 1})} btn`}>
                            {`Pm25`}
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            onClick={() => this.toggle(2)}
                            className={`${classnames({active: activeTab === 2})} btn`}>
                            {`Pm10`}
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            onClick={() => this.toggle(3)}
                            className={`${classnames({active: activeTab === 3})} btn`}>
                            {`SO2`}
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            onClick={() => this.toggle(4)}
                            className={`${classnames({active: activeTab === 4})} btn`}>
                            {`NO2`}
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
};

ResultBox.propTypes = {
    pollution: PropTypes.object.isRequired
};

export default ResultBox
