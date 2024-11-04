import React from 'react';
import {useStore} from "../../hooks";
import {observer} from "mobx-react-lite";
import {LoadButton} from "./LoadButton";
import {UsersTable} from "./UserTable/UsersTable";
import {EmptyContent} from "./EmptyContent";
import {Error} from "../@common/Error";
import {Loader} from "../@common/Loader";
import {ClearButton} from "./ClearButton";
import {AddUserButton} from "./AddUserButton";
import {Container} from "../@common/Container";

export const Main = observer(() => {
    const {users} = useStore()
    return (
        <Container>
            {users.isError && <Error/>}
            {users.isLoading && <Loader/>}
            {users.isEmpty && <EmptyContent />}
            {users.isReady && <UsersTable />}
            <div className="buttons">
                <LoadButton />
                {users.isReady && <>
                    <ClearButton />
                    <AddUserButton />
                </>}
            </div>
        </Container>
    );
});

