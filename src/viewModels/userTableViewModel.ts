import {hydrate} from "../utils";
import {computed, makeObservable, observable} from "mobx";
import {persist} from "mobx-persist";
import {UserStore} from "../store/users";
import {ViewModel} from "@yoskutik/react-vvm";
import {inject, injectable} from "inversify";

@injectable()
class UserTableViewModel extends ViewModel {
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

    constructor(@inject("UserStore") usersStore: UserStore) {
        super();
        makeObservable(this);
    }

}

// hydrate('userTable', userTableViewModel)

// export {userTableViewModel}

export {UserTableViewModel}