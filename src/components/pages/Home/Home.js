import React from 'react';
import {Animated} from "react-animated-css";
import graphic from '../../../images/graphic.png';
import './Home.scss';

const Home = () => (
    <div className='home-main'>
        <Animated
            animationIn='fadeIn'
            animationInDelay={1000}
            isVisible={true}>
            <div className='home-info'>
                <h1>Hello</h1>
            </div>
        </Animated>
        <Animated
            animationIn='fadeIn'
            animationInDelay={3000}
            isVisible={true}>
            <div className='home-info'>
                <h2>Now you can check the facts</h2>
            </div>
        </Animated>
        <Animated
            animationIn='fadeIn'
            animationInDelay={5000}
            isVisible={true}>
            <div className='home-info'>
                <h2>about the 10 most polluted cities</h2>
            </div>
        </Animated>
        <Animated
            animationIn='fadeIn'
            animationInDelay={7000}
            isVisible={true}>
            <div className='home-info'>
                <h2>in France, Germany, Poland and Spain</h2>
            </div>
        </Animated>
        <Animated
            animationIn='fadeIn'
            animationInDelay={9000}
            isVisible={true}>
            <Animated
                animationIn='jello'
                animationInDelay={9500}
                isVisible={true}>
                <div className='home-info'>
                    <img src={graphic} alt='graphic'/>
                </div>
            </Animated>
        </Animated>
    </div>
);

export default Home;
