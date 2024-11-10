import React from 'react';
import {UserTableHeader} from "./UserTableHeader";
import {childView} from "@yoskutik/react-vvm";
import {UserTableViewModel} from "@viewModels";

export const UserTableHeaders: React.FC = childView<UserTableViewModel>()(({viewModel}) => {

    return (
        <div
            className="user-table__headers"
            style={{gridTemplateColumns: viewModel.gridTemplate}}
        >
            {viewModel.headers.map((header, index) => (
                <UserTableHeader
                    key={header}
                    index={index}
                    header={header}
                />
            ))}
        </div>
    );
});

