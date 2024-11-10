import React from 'react';
import {childView} from "@yoskutik/react-vvm";
import {UserTableViewModel} from "@viewModels";
import {useNavigate} from "react-router-dom";
import {Navigation} from "@types";
import {UserTableRow} from "./UserTableRow";

export const UserTableRows: React.FC = childView<UserTableViewModel>()(({viewModel}) => {
    const navigate = useNavigate()
    return (
        <div className="user-table__rows">
            {viewModel.rows.map(({id, row}, index) => (
                <div
                    key={id}
                    className={'user-table__row'}
                    style={{gridTemplateColumns: viewModel.gridTemplate}}
                    onDragEnd={(e) => viewModel.drag(index, e)}
                    onDragOver={e => e.preventDefault()}
                    draggable={!viewModel.isResizing}
                >
                    {row.map((rowContent, index) => (
                        <UserTableRow index={index} {...rowContent} />
                    ))}
                    <div className={'user-table__row__content user-table__row__content_actions'}>
                        <div
                            className="user-table__header__resize_left"
                            onMouseDown={e => viewModel.resize(e, viewModel.rows.length - 2)}
                        />
                        <button
                            title={"Edit"}
                            onClick={() => navigate(`${Navigation.EDIT_USER}/${id}`)}
                            className={'user-table__row__content__action user-table__row__content__action_edit'}
                        />
                        <button
                            title={"Delete"}
                            onClick={() => viewModel.removeUser(id)}
                            className={'user-table__row__content__action user-table__row__content__action_delete'}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
});

