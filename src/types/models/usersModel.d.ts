
interface IUsersModel extends IHydratable {
    rawData: TRawUser[]
    data: IUser[];
    error: string | null;
    isEverLoaded: boolean;
    isLoading: boolean;
    isError: boolean;
    isEmpty: boolean;
    isReady: boolean;
    fetchUsers(page?:number, limit?: number): void;
    addUser(user: Partial<IUser>, callback: () => void): void;
    removeUser(id: string): void;
    removeAllUsers(): void;
    moveUser(fromIndex: number, offset: number): void;
}

type TRawUser = IUserFromServer & IUser;

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