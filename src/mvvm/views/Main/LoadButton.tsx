import React from 'react';
import {Button} from "@library";
import {childView} from "@yoskutik/react-vvm";
import {MainViewModel} from "@viewModels";

export const LoadButton = childView<MainViewModel>()(({
    viewModel: {usersModel: users}
}) => {
    return (
        <Button onClick={() => users.fetchUsers()}>
            {users.isReady ? "Reload" : "Load"} users
        </Button>
    );
});