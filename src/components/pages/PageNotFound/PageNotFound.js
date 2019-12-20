import React from 'react';
import {Animated} from "react-animated-css";

const PageNotFound = () => (
    <div>
        <Animated
            animationIn='shake'
            isVisible={true}>
            <div className='color-red text-center'>
                <h1>Page not found - 404</h1>
            </div>
        </Animated>
    </div>
);

export default PageNotFound;
