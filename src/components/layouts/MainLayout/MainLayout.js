import React from 'react';
import PageContainer from '../PageContainer/PageContainer';
import NavBar from '../../features/NavBar/NavBar';
import {links} from '../../../utilities/functions';

const MainLayout = ({children}) => (
    <PageContainer>
        <NavBar links={links}/>
        {children}
    </PageContainer>
);

export default MainLayout;
