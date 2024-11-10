import {action, computed, flow, makeObservable, observable, reaction} from "mobx";
import {AxiosResponse, isAxiosError} from "axios";
import {api} from "@services";
import {Status} from "@types";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {persist} from "mobx-persist";
import {singleton} from "tsyringe";
import {persistable} from "@utils";
import {omit} from "lodash";

dayjs.extend(relativeTime);

@singleton()
@persistable("users")
export class UsersModel implements IUsersModel {
    // @observable
    @persist('list') @observable rawData: TRawUser[] = [];
    @observable status: Status = Status.none
    @observable error: string | null = null;
    @persist @observable isEverLoaded = false;

    // @computed
    @computed get data(): IUser[] {
        return this.rawData.map(user => omit(user, "birthdate"))
    }
    @computed get isReady() {
        return this.data.length > 0 && this.status === Status.done;
    }
    @computed get isEmpty() {
        return this.data.length === 0 && this.status === Status.none
    }
    @computed get isLoading() {
        return this.status === Status.loading;
    }
    @computed get isError() {
        return this.status === Status.error && this.error !== null;
    }

    // @ flow()
    @flow
    *fetchUsers(page = 1, limit = 10) {
        try {
            this.isEverLoaded = true;
            this.status = Status.loading

            const {data}: AxiosResponse<IUserFromServer[]> = yield api.get(`/users?page=${page}&limit=${limit}`)
            this.rawData = data.map(user => this.parseUserFromServer(user));
            this.status = this.data.length ? Status.done : Status.none
        }
        catch (e: unknown) {
            this.catchError(e)
        }
    }
    @flow
    *removeUser(userId: string) {
        try {
            this.status = Status.loading;
            yield api.delete(`/users/${userId}`)
            this.rawData = this.rawData.filter((user) => user.id !== userId);
            this.status = Status.done;
        }
        catch (e: unknown) {
            this.catchError(e)
        }
    }
    @flow
    *removeAllUsers() {
        try {
            this.status = Status.loading
            const {data}: AxiosResponse<IUserFromServer[]> = yield api.get('/users');
            for(let user of data) {
                yield api.delete(`/users/${user.id}`)
            }
            this.status = Status.none
            this.rawData = []
        }
        catch (e: unknown) {
            this.catchError(e)
        }
    }
    @flow
    *addUser(form: IUserForm) {
        try {
            this.status = Status.loading;
            const {data}: AxiosResponse<IUserFromServer> = yield api.post("/users", form);
            this.rawData = [...this.rawData, this.parseUserFromServer(data)]
            this.status = Status.done;
        }
        catch (e: unknown) {
            this.catchError(e)
        }
    }
    @flow
    *editUser(form: IUserForm, id: string) {
        try {
            this.status = Status.loading;
            const {data}: AxiosResponse<IUserFromServer> = yield api.put("/users/" + id, form)
            this.rawData = this.rawData.map((user) => user.id === id ? this.parseUserFromServer(data) : user);
            this.status = Status.done;
        }
        catch (e) {
            this.catchError(e)
        }
    }

    // @action()
    @action moveUser(fromIndex: number, offset: number) {
        const targetUser = this.rawData[fromIndex]
        const toIndex = Math.ceil(fromIndex + offset)

        if(toIndex >= 0) {
            this.rawData.splice(fromIndex, 1)
            this.rawData.splice(toIndex, 0, targetUser)
        }

    }
    // private
    private parseUserFromServer(user: IUserFromServer): TRawUser {
        return ({
            age: dayjs().diff(dayjs(user.birthdate), 'year'),
            birthdate: user.birthdate,
            name: user.name,
            phoneNumber: user.phoneNumber,
            email: user.email,
            website: user.website,
            id: user.id,
        })
    }
    @action
    private catchError(e: unknown, usersSnapshot?: TRawUser[]) {
        this.status = Status.error;
        if(usersSnapshot) {
            this.rawData = usersSnapshot; // возвращаем старые данные, если была ошибка
        }
        if (isAxiosError(e)) {
            this.error = e.message;
        }
        // other errors
    }

    // не должен использоваться снаружи, но нам необходимо вызывать его в hydrate.then()
    // поэтому не поставил модификатор private
    _onHydrated() {
        if(this.data.length) {
            this.status = Status.done;
        }
    }
    private usersReaction() {
        reaction(() => !this.data.length, (isEmpty) => {
            if(isEmpty) {
                this.status = Status.none;
            }
        })
    }
    private errorReaction() {
        reaction(() => this.error, (error) => alert(error))
    }

    // constructor
    constructor() {
        makeObservable(this);
        this.usersReaction()
        this.errorReaction();
    }
}