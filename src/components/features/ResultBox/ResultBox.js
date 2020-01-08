import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';
import classnames from 'classnames';
import ResultList from '../../common/ResultList/ResultList';
import './ResultBox.scss';

const ResultBox = props => {
    const [activeTab, setActiveTab] = useState(1);
    const {pollution, setTypePollution} = props;

    useEffect(() => {
        setTypePollution('Pm25');
        return () => {
            setTypePollution('');
        }
    }, [setTypePollution]);

    const toggle = (tab, type) => {
        const {setTypePollution} = props;
        setTypePollution(type);
        if (activeTab !== tab) setActiveTab(tab);
    };

    return (
        <div className='result-box-main'>
            <Nav tabs>
                {Array.from(Object.keys(pollution)).slice(0, 4).map((item, i) => {
                    return (
                        <NavItem key={i}>
                            <NavLink
                                onClick={() => toggle(i + 1,
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
};

ResultBox.propTypes = {
    pollution: PropTypes.object.isRequired,
    setTypePollution: PropTypes.func.isRequired
};

export default ResultBox
