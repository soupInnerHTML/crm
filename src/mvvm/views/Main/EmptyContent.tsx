import React from 'react';
import Lottie from 'lottie-react';
import emptyAnimationData from '@animations/empty.json';

export const EmptyContent: React.FC = () => {
    return (
        <div className={'empty-content'}>
            <p>There is some empty space...</p>
            <div className={'animation'}>
                <Lottie animationData={emptyAnimationData} loop={true}/>
            </div>
            <p>But, you can</p>
        </div>

    );
};