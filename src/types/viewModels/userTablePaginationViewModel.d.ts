interface IUserTablePaginationViewModel {
    page: number;
    pagesCount: number;
    pageLimit: number;
    pages: number[];
    paginate(page: number): void;
}