import React from 'react';
import PropTypes from 'prop-types';
import {Table} from 'reactstrap';
import ResultItem from '../../common/ResultItem/ResultItem';

const ResultList = props => {
    const {pollution, name, unit} = props;
    return (
        <div>
            <Table dark>
                <thead>
                <tr>
                    <th className='text-right'>Pos</th>
                    <th>City</th>
                    <th className='text-center'>{`${name} (${unit})`}</th>
                </tr>
                </thead>
                <tbody>
                {pollution.map((item, i) => {
                    return <ResultItem key={i} pollution={item} i={i}/>
                })}
                </tbody>
            </Table>
        </div>
    )
};

ResultList.propTypes = {
    pollution: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    unit: PropTypes.string.isRequired
};

export default ResultList
