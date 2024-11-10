import React from "react";
import cs from "classnames";
import {childView} from "@yoskutik/react-vvm";
import {UserTableViewModel} from "@viewModels";

interface IUserTableHeaderProps {
    header: TUserTableHeader;
    index: number;
}

export const UserTableHeader = childView<UserTableViewModel>()<IUserTableHeaderProps>(({
    viewModel,
    header,
    index,
}) => {
    const readableHeader = viewModel.readableHeaders[index];

    return <div className="user-table__header">
        {index > 0 && <div
            className="user-table__header__resize_left"
            onMouseDown={e => viewModel.resize(e, index - 1)}
        />}
        {readableHeader && <p
            onClick={() => viewModel.sort(header as TUserTableHeaderSorting)}
            className={cs("user-table__header__text", {
                'user-table__header__text_sorted': viewModel.sorting?.key === header,
                'user-table__header__text_sorted_asc': viewModel.sorting?.isASC && viewModel.sorting.key === header,
            })}
        >
            {readableHeader}
        </p>}
        {index < viewModel.headers.length - 1 &&
            <div
                className="user-table__header__resize_right"
                onMouseDown={e => viewModel.resize(e, index)}
            />
        }
    </div>
})