import {hydrate} from "../utils";
import {computed, observable} from "mobx";
import {persist} from "mobx-persist";

class UserTableViewModel {
    @persist('list') @observable rows = [
        "8%",
        "minmax(100px, 1fr)",
        "minmax(100px, 1fr)",
        "minmax(100px, 1fr)",
        "minmax(100px, 1fr)",
        "8%"
    ]

    @computed get gridTemplate() {
        return this.rows.reduce((acc, current) => `${acc} ${current}`)
    }

}

const userTableViewModel = new UserTableViewModel();

hydrate('userTable', userTableViewModel)

export {userTableViewModel}