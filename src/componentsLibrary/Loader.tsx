import React from 'react';
import Lottie from "lottie-react";
import loadingAnimationData from "@animations/loading.json";

export const Loader: React.FC = () => {
    return (
        <div className={'animation'}>
            <Lottie animationData={loadingAnimationData} loop={true}/>
        </div>
    );
};

