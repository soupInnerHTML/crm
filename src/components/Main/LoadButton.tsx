import React from 'react';
import {useStore} from "../../hooks";
import {Button} from "../@common/Button";
import {observer} from "mobx-react-lite";

export const LoadButton: React.FC = observer(() => {
    const {users} = useStore()
    return (
        <Button onClick={() => users.fetchUsers()}>
            {users.isReady ? "Reload" : "Load"} users
        </Button>
    );
});