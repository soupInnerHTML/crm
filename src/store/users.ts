import {makeObservable, observable, reaction, action, flow, computed} from "mobx";
import {api} from "../api";
import {AxiosResponse} from "axios";
import {Status} from "../types";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {persist} from "mobx-persist";
import {hydrate} from "../utils";

dayjs.extend(relativeTime);

class UserStore implements IUsersStore {
    // @observable
    @persist('list') @observable data: IUser[] = [];
    @persist @observable page = 1;
    @observable pagesCount = 0;
    @observable status: Status = Status.none
    @observable error = null;

    pageLimit = 10

    // @computed
    @computed get isReady() {
        return this.data.length > 0 && this.status === Status.done;
    }
    @computed get isEmpty() {
        return this.data.length === 0 && this.status === Status.none;
    }
    @computed get isLoading() {
        return this.status === Status.loading;
    }
    @computed get isError() {
        return this.status === Status.error && this.error !== null;
    }

    // @ flow()
    @flow
    *fetchUsers() {
        console.log(this.page)
        this.status = Status.loading
        try {
            const {data}: AxiosResponse<IUserFromServer[]> = yield api.get(`/users?page=${this.page}&limit=${this.pageLimit}`)

            this.data = data.map(user => this.parseUserFromServer(user))

            this.status = Status.done
        }
        catch (e: any) {
            this.status = Status.error
            this.error = e;
        }
    }
    @flow
    *removeUser(userId: string) {
        const snapshot = this.data;
        this.data = this.data.filter((user) => user.id !== userId);

        try {
            yield api.delete(`/users/${userId}`)
            this.updatePagination()
        }
        catch (e: any) {
            this.data = snapshot;
            this.error = e;
            this.status = Status.error;
        }
    }
    @flow
    *removeAllUsers() {
        const snapshot = this.data;
        this.data = []

        try {
            const {data}: AxiosResponse<IUserFromServer[]> = yield api.get('/users');
            data.forEach((user) => {
                api.delete(`/users/${user.id}`)
            })
        }
        catch (e: any) {
            this.data = snapshot;
            this.error = e;
            this.status = Status.error;
        }
    }
    @flow
    *addUser(user: Partial<IUser>, callback: () => void) {
        this.status = Status.loading;
        const {data}: AxiosResponse<IUserFromServer> = yield api.post("/users", user);
        if(this.data.length < this.pageLimit) {
            this.data.push(this.parseUserFromServer(data));

        }
        else {
            this.updatePagination()
        }
        this.status = Status.done;
        callback()
    }
    @flow
    *updatePagination() {
        try {
            const {data}: AxiosResponse<IUserFromServer[]> = yield api.get(`/users`)

            this.pagesCount = Math.ceil(data?.length / this.pageLimit)

            const currentPagesCount = Math.ceil(this.data.length / this.pageLimit)

            if(currentPagesCount !== this.pagesCount) {
                this.page = 1
            }
        }
        catch (e) {
            alert(e)
        }
    }

    // @action()
    @action sortBy(key: UserTableHeaderSorting, isASC: boolean) {
        this.data = this.data.sort((a, b) => this.compare(key, isASC, a, b))
    }
    @action moveUser(fromIndex: number, offset: number) {
        const targetUser = this.data[fromIndex]
        const toIndex = Math.ceil(fromIndex + offset)

        if(toIndex >= 0) {
            this.data.splice(fromIndex, 1)
            this.data.splice(toIndex, 0, targetUser)
        }

    }
    @action paginate(page: number) {
        this.page = page;
    }

    // private
    private parseUserFromServer(user: IUserFromServer): IUser {
        return ({
            age: dayjs().diff(dayjs(user.birthdate), 'year'),
            name: user.name,
            phoneNumber: user.phoneNumber,
            email: user.email,
            website: user.website,
            id: user.id,
        })
    }
    private compare(key: keyof IUser, isASC: boolean, a: IUser, b: IUser) {
        const current = a[key];
        const next = b[key];

        if (typeof current === "string" && typeof next === "string") {
            return isASC
                ? current.localeCompare(next, undefined, { sensitivity: 'base' })
                : next.localeCompare(current, undefined, { sensitivity: 'base' });
        }
        else if(typeof current === "number" && typeof next === "number") {
            return isASC ? current - next : next - current;
        }
        else {
            return -1
        }
    }

    // не должен использоваться снаружи, но нам необходимо вызывать его в hydrate.then()
    // поэтому не поставил модификатор private
    _onHydrated() {
        if(this.data.length) {
            this.status = Status.done;
        }
    }

    // constructor
    constructor() {
        makeObservable(this);

        // pagination
        this.updatePagination()
        reaction(() => this.page, () => {
            this.fetchUsers()
            console.log(this.page)
        })

        reaction(() => this.data, () => {
            if(!this.data.length) {
                this.status = Status.none;
            }
        })
    }
}

const userStore = new UserStore();
hydrate("users", userStore).then(() => userStore._onHydrated())
export {userStore}