import React from 'react';
import cs from "classnames";
import {view} from "@yoskutik/react-vvm";
import {UserTablePaginationViewModel} from "@viewModels";

export const UserTablePagination = view(UserTablePaginationViewModel)(({viewModel}) => {
    return (
        <div className={'pagination'}>
            {viewModel.pages.map((page) => (
                <button
                    key={page}
                    className={cs("pagination__page", {"pagination__page_active": page === viewModel.page})}
                    onClick={() => viewModel.paginate(page)}
                >
                    {page}
                </button>)
            )}
        </div>
    );
});

