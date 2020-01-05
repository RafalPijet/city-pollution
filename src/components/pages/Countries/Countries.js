import React from 'react';
import ZIndex from 'react-z-index';
import SearchBox from '../../features/SearchBox/SearchBoxContainer';
import ContentBox from '../../features/ContentBox/ContentBoxContainer';

const Countries = () => (
    <div>
        <ZIndex index={10}>
            <SearchBox/>
        </ZIndex>
        <ZIndex index={1}>
            <ContentBox/>
        </ZIndex>
    </div>
);

export default Countries;
