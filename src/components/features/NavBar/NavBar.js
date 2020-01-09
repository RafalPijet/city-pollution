import React from 'react';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom'
import {checkPath} from "../../../utilities/functions";
import './NavBar.scss';

const NavBar = ({links, location}) => {
    return (
        <div className='main-menu'>
            <ul className='list-box'>
                {links.map((link, i) => (
                    <li key={i}>
                        <Link className={checkPath(location.pathname, link.path) ? 'active' : ''}
                              to={link.path}>{link.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
};

NavBar.propTypes = {
    links: PropTypes.arrayOf(PropTypes.shape({
        path: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired
    }))
};

export default withRouter(props => <NavBar {...props}/>);
