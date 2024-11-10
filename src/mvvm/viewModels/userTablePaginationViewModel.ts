import {ViewModel} from "@yoskutik/react-vvm";
import {persist} from "mobx-persist";
import {action, computed, flow, makeObservable, observable, reaction, when} from "mobx";
import {AxiosResponse} from "axios";
import {singleton} from "tsyringe";
import {api} from "@services";
import {UsersModel} from "@models";
import {persistable} from "@utils";

@singleton()
@persistable("userTablePagination")
export class UserTablePaginationViewModel extends ViewModel implements IUserTablePaginationViewModel {
    @persist @observable page = 1;
    @observable pagesCount = 1;
    pageLimit = 10

    @computed get pages() {
        return this.pagesCount > 1 ? Array.from({ length: this.pagesCount }, (_, i) => i + 1) : []
    }

    @flow
    private *getPagination() {
        try {
            // тут можно было бы использовать endpoint, который просто отдает суммарное количество элементов
            const {data}: AxiosResponse<IUserFromServer[]> = yield api.get(`/users`)
            this.pagesCount = Math.ceil(data?.length / this.pageLimit)
        }
        catch (e) {
            alert(e)
        }
    }
    @flow
    private *updatePagination(usersCount: number, prevUsersCount: number) {
        // если пользователя на страничке закончились
        if(!usersCount && this.pagesCount > 0 && this.page > 0) {
            this.page--;
            this.pagesCount--;
        }
        // если происходит overflow, то обновляется пагинация и пользователь добавляется на последнюю страницу
        if(usersCount > this.pageLimit) {
            yield this.getPagination()
            return this.page = this.pagesCount;
        }
        // если удаляется пользователь, то в конец добавляется еще один и обновляется пагинация
        if(prevUsersCount > usersCount && prevUsersCount === this.pageLimit && this.pagesCount > this.page && this.pagesCount > 0) {
            yield this.usersModel.fetchUsers(this.page, this.pageLimit)
            this.getPagination()
        }
    }

    @action
    paginate(page: number) {
        this.page = page;
    }

    @action
    private usersActionReaction() {
        reaction(() => this.usersModel.data.length, (usersCount, prevUsersCount) => {
            this.updatePagination(usersCount, prevUsersCount)
        })
    }

    @action
    private paginationReaction() {
        reaction(() => this.page, (page) => {
            this.usersModel.fetchUsers(page, this.pageLimit)
        })
    }

    constructor(private usersModel: UsersModel) {
        super();
        makeObservable(this)

        this.getPagination()
        when(() => this.usersModel.isReady, () => {
            this.usersActionReaction()
            this.paginationReaction()
        })

    }

}