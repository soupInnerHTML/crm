import React, {useEffect, useMemo, useState} from 'react';
import {useStore} from "../../../../hooks";
import {observer} from "mobx-react-lite";
import {makeHeader} from "../../../../utils/makeHeader";
import {UserTableHeader} from "./UserTableHeader";
// import {UserTableViewModel} from "../../../../viewModels/userTableViewModel";

export const UserTableHeaders: React.FC = observer(() => {
    const [sorting, setSorting] = useState<ISortingField | null>(null)
    const {users} = useStore()
    const headers = useMemo(() => {
        return makeHeader(users.data) as UserTableHeaders
    }, [users.data])

    useEffect(() => {
        if(sorting) {
            users.sortBy(sorting.key, sorting.isASC)
        }
    }, [sorting?.key, sorting?.isASC])

    return (
        <div
            className="user-table__headers"
            // style={{gridTemplateColumns: userTableViewModel.gridTemplate}}
        >
            {headers.map((header, index) => (
                <UserTableHeader
                    key={header}
                    index={index}
                    header={header}
                    sorting={sorting}
                    setSorting={setSorting}
                />
            ))}
        </div>
    );
});

