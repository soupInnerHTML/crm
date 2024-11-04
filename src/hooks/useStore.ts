import {useContext} from "react";
import {StoreContext} from "../context";


export const useStore = (): IStoreContext => {
    const context = useContext(StoreContext);
    if (!context) {
        throw new Error("useStore must be used within a StoreProvider");
    }
    return context;
};