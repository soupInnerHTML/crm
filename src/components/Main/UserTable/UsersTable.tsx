import React from 'react';
import {UserTableHeaders} from "./UserTableHeaders";
import {UserTableRows} from "./UserTableRows";
import {UserTablePagination} from "./UserTablePagination";

export const UsersTable: React.FC = () => {
    return (
        <div>
            <div className={'user-table'}>
                <UserTableHeaders/>
                <UserTableRows />
            </div>
            <UserTablePagination />
        </div>
    );
};