import React from 'react';
import {Button} from "@library";
import {areYouSure} from "@utils";
import {childView} from "@yoskutik/react-vvm";
import {MainViewModel} from "@viewModels";

export const ClearButton = childView<MainViewModel>()(({
    viewModel: {usersModel}
}) => {
    return (
        <Button onClick={() => areYouSure(() => usersModel.removeAllUsers(), "Are you sure you want to clear the table?")}>
            Clear all data
        </Button>
    );
});