interface IUserTableViewModel {
    isResizing: boolean;
    tableWidth: number;
    sorting: ISortingField | null;
    rowsPercentage: number[];
    rowsTotalWidth: number;
    gridTemplate: string;
    headers: TUserTableHeaders;
    readableHeaders: string[];
    rows: IRows[]
    users: IUser[]
    setTableWidth(width: number): void;
    removeUser(id: string, message?: string): void;
}

type TUserTableHeaderSorting = keyof Omit<IUser, 'id'>;
type TUserTableHeader = UserTableHeaderSorting | "";
type TUserTableHeaders = TUserTableHeader[];
type IUserForm = Omit<IUserFromServer, 'id'>;

interface ISortingField {
    key: UserTableHeaderSorting;
    isASC: boolean;
}

interface IRows {
    id: string;
    row: IRow[];
}
interface IRow {
    title: string;
    key: string;
    href?: string;
}