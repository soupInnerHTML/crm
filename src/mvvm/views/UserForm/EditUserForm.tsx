import React, {useLayoutEffect} from 'react';
import {view} from "@yoskutik/react-vvm";
import UserForm from "./UserForm";
import {useParams} from "react-router-dom";
import {EditUserFormViewModel} from "@viewModels";

export const EditUserForm = view<EditUserFormViewModel>(EditUserFormViewModel)(({viewModel}) => {
    const { userId } = useParams();
    useLayoutEffect(() => {
        if(userId) {
            viewModel.setUser(userId);
        }
    }, [userId])
    return (
        <UserForm userId={userId} buttonTitle={'Edit User'} />
    );
});

