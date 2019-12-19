import React from 'react';
import {Animated} from "react-animated-css";
import './Home.scss';

const Home = () => (
    <div className='home-main'>
        <Animated
            animationIn='fadeIn'
            animationOut='rubberBand'
            animationInDelay={2000}
            isVisible={true}>
            <div className='home-info'>
                <h3>Hello</h3>
            </div>
        </Animated>
    </div>
);

export default Home;
