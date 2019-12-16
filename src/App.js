import React from 'react';
import {Switch, Route} from 'react-router-dom';
import MainLayout from './components/layouts/MainLayout/MainLayout';
import Home from './components/pages/Home/Home';
import Countries from './components/pages/Countries/Countries';
import PageNotFound from './components/pages/PageNotFound/PageNotFound';

function App() {
    return (
        <MainLayout>
            <Switch>
                <Route path='/' exact component={Home}/>
                <Route path='/countries' exact component={Countries}/>
                <Route component={PageNotFound}/>
            </Switch>
        </MainLayout>
    );
}

export default App;
