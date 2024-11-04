import {createContext} from "react";
import {userStore} from "../store";

export const StoreContext = createContext<IStoreContext>({users: userStore});
