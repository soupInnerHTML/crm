import React from 'react';
import {UserTableHeaders} from "./UserTableHeaders";
import {UserTableRows} from "./UserTableRows";
import {UserTablePagination} from "./UserTablePagination";
import {view} from "@yoskutik/react-vvm";
import {UserTableViewModel} from "../../../viewModels/userTableViewModel";

interface UserTableProps {}

export const UsersTable = view(UserTableViewModel)<UserTableProps>(({viewModel}) => {
    console.log(viewModel)
    return (
        <div>
            <div className={'user-table'}>
                <UserTableHeaders/>
                <UserTableRows />
            </div>
            <UserTablePagination />
        </div>
    );
});