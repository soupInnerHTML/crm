
interface IUsersStore {
    data: IUser[];
    isLoading: boolean;
    isError: boolean;
    isEmpty: boolean;
    isReady: boolean;
    page: number;
    pagesCount: number;
    fetchUsers(page?:number): void;
    addUser(user: Partial<IUser>, callback: () => void): void;
    removeUser(id: string): void;
    removeAllUsers(): void;
    moveUser(fromIndex: number, offset: number): void;
    sortBy(key: UserTableHeaderSorting, iaASC: boolean): void;
    paginate(page: number): void;
    _onHydrated(): void;
}

interface IUserFromServer {
    id: string;
    name: string;
    birthdate: string;
    phoneNumber: string;
    email: string;
    website: string;
}

interface IUser {
    id: string;
    name: string;
    phoneNumber: string;
    email: string;
    website: string;
    age: number;
}
type UserTableHeader = (keyof Omit<IUser, 'id'> | "")
type UserTableHeaders = IUserTableHeader[];
type UserTableHeaderSorting = keyof Omit<IUser, 'id'>

type IUserForm = Omit<IUserFromServer, 'id'>

interface IStoreContext {
    users: IUsersStore;
}

interface ISortingField {
    key: UserTableHeaderSorting;
    isASC: boolean;
}