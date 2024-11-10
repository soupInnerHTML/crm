import React, {useLayoutEffect, useRef} from 'react';
import {UserTableHeaders} from "./UserTableHeaders";
import {UserTableRows} from "./UserTableRows";
import {UserTablePagination} from "./UserTablePagination";
import {view} from "@yoskutik/react-vvm";
import {UserTableViewModel} from "@viewModels";

export const UsersTable: React.FC = () => {
    return (
        <div className={'user-table-container'}>
            <UserTableInner />
            <UserTablePagination />
        </div>
    );
};

const UserTableInner: React.FC = view(UserTableViewModel)(({viewModel}) => {
    const ref = useRef<HTMLDivElement>(null);
    useLayoutEffect(() => {
        if(ref.current) {
            viewModel.setTableWidth(ref.current.offsetWidth);
        }
    }, [])
    return (
        <div className={'user-table'} ref={ref}>
            <UserTableHeaders/>
            <UserTableRows />
        </div>
    );
});