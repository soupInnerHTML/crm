import React from 'react';
import Lottie from 'lottie-react';
import emptyAnimationData from '../../assets/animations/empty.json'; // Импортируйте ваш файл анимации

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