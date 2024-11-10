import React from 'react';
import {childView} from "@yoskutik/react-vvm";
import {UserTableViewModel} from "@viewModels";

interface UserTableRowProps extends IRow {
    index: number;

}

export const UserTableRow = childView<UserTableViewModel>()<UserTableRowProps>(({
    viewModel, index, title, href
}) => {
    return (
        <div className={'user-table__row__content'}>
            {index > 0 && <div
                className="user-table__header__resize_left"
                onMouseDown={e => viewModel.resize(e, index - 1)}
            />}
            {href ?
                <a
                    title={title}
                    className={'user-table__row__content__text'}
                    target={'_blank'}
                    href={href}
                    rel="noreferrer"
                >
                    {title}
                </a>
                :
                <p
                    title={title}
                    className={'user-table__row__content__text'}
                >
                    {title}
                </p>
            }
            <div
                className="user-table__header__resize_right"
                onMouseDown={e => viewModel.resize(e, index)}
            />
        </div>
    );
});