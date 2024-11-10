import React from 'react';
import {LoadButton} from "./LoadButton";
import {UsersTable} from "./UserTable";
import {EmptyContent} from "./EmptyContent";
import {Error} from "@library";
import {Loader, Container} from "@library";
import {ClearButton} from "./ClearButton";
import {AddUserButton} from "./AddUserButton";
import {view} from "@yoskutik/react-vvm";
import {MainViewModel} from "@viewModels";

export const Main = view<MainViewModel>(MainViewModel)(({
    viewModel: {usersModel: users}
}) => {
    return (
        <Container>
            {users.isError && <Error>{users.error}</Error>}
            {users.isLoading && <Loader/>}
            {users.isEmpty && <EmptyContent />}
            {users.isReady && <UsersTable />}
            <div className="buttons">
                {!users.isLoading && <LoadButton />}
                {users.isReady && <ClearButton />}
                {!users.isLoading && users.isEverLoaded && <AddUserButton />}
            </div>
        </Container>
    );
});

