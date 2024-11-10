import React from 'react';
import {view} from "@yoskutik/react-vvm";
import {AddUserFormViewModel} from "@viewModels";
import UserForm from "./UserForm";

export const AddUserForm = view<AddUserFormViewModel>(AddUserFormViewModel)(() => {
    return (
        <UserForm buttonTitle={"Add User"} />
    );
});

