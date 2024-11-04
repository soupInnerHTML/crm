import React from 'react';
import {observer} from "mobx-react-lite";
import {useStore} from "../../../hooks";
import {areYouSure} from "../../../utils/areYouSure";
import {userTableViewModel} from "../../../viewModels/userTableViewModel";

export const UserTableRows: React.FC = observer(() => {
    const {users} = useStore()
    function onDragEnd(fromIndex: number, e: React.DragEvent<HTMLDivElement>) {
        const dragging = e.currentTarget
        const top = dragging.getBoundingClientRect().top
        const headerHeight = 60;
        const offsetY = e.clientY - top - headerHeight;
        const rowHeight = 53;
        users.moveUser(fromIndex, offsetY / rowHeight)
    }
    return (
        <div className="user-table__rows">
            {users.data.map((user, index) => (
                <div
                    key={user.id}
                    className={'user-table__row'}
                    style={{gridTemplateColumns: userTableViewModel.gridTemplate}}
                    onDragEnd={(e) => onDragEnd(index, e)}
                    onDragOver={e => e.preventDefault()}
                    draggable
                >
                    <div className={'user-table__row__content'}>
                        <p
                            title={user.age.toString()}
                            className={'user-table__row__content__text'}
                        >
                            {user.age}
                        </p>
                    </div>
                    <div className={'user-table__row__content'}>
                        <p
                            title={user.name}
                            className={'user-table__row__content__text'}
                        >
                            {user.name}
                        </p>
                    </div>
                    <div className={'user-table__row__content'}>
                        <p
                            title={user.phoneNumber}
                            className={'user-table__row__content__text'}
                        >
                            {user.phoneNumber}
                        </p>
                    </div>
                    <div className={'user-table__row__content'}>
                        <p
                            title={user.email}
                            className={'user-table__row__content__text'}
                        >
                            {user.email}
                        </p>
                    </div>
                    <div className={'user-table__row__content'}>
                        <a
                            title={user.website}
                            className={'user-table__row__content__text'}
                            target={'_blank'}
                            href={"https://" + user.website}
                            rel="noreferrer"
                        >
                            {user.website}
                        </a>
                    </div>
                    <div className={'user-table__row__content'}>
                        <button
                            onClick={() => areYouSure(() => users.removeUser(user.id), "Are you sure you want to delete the user?")}
                            className={'user-table__row__content__delete'}
                        >
                            delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
});

