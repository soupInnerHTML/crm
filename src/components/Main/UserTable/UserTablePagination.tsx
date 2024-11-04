import React from 'react';
import {useStore} from "../../../hooks";
import {observer} from "mobx-react-lite";
import cs from "classnames";

export const UserTablePagination = observer(() => {
    const {users} = useStore();
    const pages = users.pagesCount > 1 ? Array.from({ length: users.pagesCount }, (_, i) => i + 1) : [];
    return (
        <div className={'pagination'}>
            {pages.map((page) => (
                <button
                    key={page}
                    className={cs("pagination__page", {"pagination__page_active": page === users.page})}
                    onClick={() => users.paginate(page)}
                >
                    {page}
                </button>)
            )}
        </div>
    );
});

