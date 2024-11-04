import React from 'react';
import {useStore} from "../../hooks";
import {Button} from "../@common/Button";
import {areYouSure} from "../../utils/areYouSure";

export const ClearButton: React.FC = () => {
    const {users} = useStore()
    return (
        <Button onClick={() => areYouSure(() => users.removeAllUsers(), "Are you sure you want to clear the table?")}>
            Clear all data
        </Button>
    );
};