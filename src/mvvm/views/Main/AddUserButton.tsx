import React from 'react';
import {Button} from "@library";
import {useNavigate} from "react-router-dom";
import {Navigation} from "@types";

export const AddUserButton = () => {
    const navigate = useNavigate()
    return (
        <Button onClick={() => navigate(Navigation.ADD_USER)}>Add new user</Button>
    );
};

