import React from 'react';
import PropTypes from 'prop-types';


class ResultItem extends React.Component {
    render() {
        const {pollution, i} = this.props;
        return (
            <tr>
                <th className='text-right' scope='row'>{i + 1}</th>
                <td>{pollution.name}</td>
                <td className='text-center'>{pollution.value}</td>
            </tr>


        )
    }
}

ResultItem.propTypes = {
    pollution: PropTypes.object.isRequired,
    i: PropTypes.number.isRequired
};

export default ResultItem;
