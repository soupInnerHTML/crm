import React from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {Navigation} from "../../types";
import cs from "classnames";

const GoBack = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const isRoot = location.pathname === Navigation.MAIN;

    return (
        <button
            className={cs('go-back', {'go-back_hidden': isRoot})}
            onClick={() => navigate(-1)}
        />
    );
};

export default GoBack;