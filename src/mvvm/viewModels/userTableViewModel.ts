import {action, computed, makeObservable, observable, reaction, runInAction} from "mobx";
import {persist} from "mobx-persist";
import {ViewModel} from "@yoskutik/react-vvm";
import {areYouSure, camelCaseToText, makeHeader, persistable} from "@utils";
import {singleton} from "tsyringe";
import {UsersModel} from "@models";
import {MouseEvent, DragEvent} from "react";

@singleton()
@persistable("userTable")
export class UserTableViewModel extends ViewModel implements IUserTableViewModel {
    private minRowWidth = 8;
    private maxRowWidth = 25;

    @observable isResizing = false;
    @observable tableWidth = 1200;
    @persist('object') @observable sorting: ISortingField | null = null;
    @persist('list')   @observable rowsPercentage = [8, 21, 21, 21, 21, 8]

    @computed get rowsTotalWidth() {
        return this.rowsPercentage.reduce((acc, row) => acc + row, 0);
    }
    @computed get gridTemplate() {
        return this.rowsPercentage.reduce((acc, current) => `${acc} ${current}%`, "")
    }
    @computed get headers(): TUserTableHeaders {
        return makeHeader(this.usersModel.data)
    }
    @computed get readableHeaders() {
        return this.headers.map((header) => camelCaseToText(header))
    }
    @computed get rows(): IRows[] {
        return this.users.map(user => ({
            id: user.id,
            row: [
                {
                    title: user.age.toString(),
                    key: user.age + user.id,
                },
                {
                    title: user.name,
                    key: user.name + user.id,
                },
                {
                    title: user.phoneNumber,
                    key: user.phoneNumber + user.id,
                    href: `tel:${user.phoneNumber}`,
                },
                {
                    title: user.email,
                    key: user.email + user.id,
                    href: `mailto:${user.email}`,
                },
                {
                    title: user.website,
                    key: user.email + user.website,
                    href: `https://${user.website}`,
                },
            ]
        }))
    }
    @computed get users() {
        return this.usersModel.data
    }

    @action setTableWidth(width: number) {
        this.tableWidth = width;
    }
    @action removeUser(id: string, message = "Are you sure you want to delete the user?") {
        areYouSure(() => this.usersModel.removeUser(id), message)
    }
    @action drag(fromIndex: number, e: DragEvent<HTMLDivElement>) {
        if(!this.isResizing) {
            const dragging = e.currentTarget
            const top = dragging.getBoundingClientRect().top
            const headerHeight = 60; // TODO fix
            const offsetY = e.clientY - top - headerHeight;
            const rowHeight = 53; // TODO fix
            this.usersModel.moveUser(fromIndex, offsetY / rowHeight)
        }
    }
    @action.bound sort(key: TUserTableHeaderSorting) {
        if(this.sorting?.key === key) {
            this.sorting = {key, isASC: !this.sorting.isASC};
        }
        else {
            this.sorting = {key, isASC: true};
        }

        this.usersModel.rawData = this.usersModel.rawData.sort((a, b) => (
            this.compare(key, this.sorting!.isASC, a, b)
        ))
    }

    @action resize(
        e: MouseEvent<HTMLDivElement>,
        index: number,
    ) {
        this.isResizing = true;
        const startX = e.clientX;
        const initialWidth = this.rowsPercentage[index];

        const mouseMoveHandler: EventListener = (e: MouseEventInit) => {
            runInAction(() => {
                const delta = (e.clientX ?? 0) - startX;
                const deltaPercent = (delta / this.tableWidth) * 100;
                const newWidth = initialWidth + deltaPercent;
                const prevRows = this.rowsPercentage.filter((_, rowIndex) => rowIndex <= index)
                const isOverflow = Math.floor(this.rowsTotalWidth) > 100 && delta > 0

                // стандартное условие: если в промежутке между maxRowWidth & minRowWidth
                if (newWidth <= this.maxRowWidth && newWidth >= this.minRowWidth && !isOverflow) {
                    this.rowsPercentage[index] = initialWidth + deltaPercent; // TODO fix
                    return this.adjustRowWidths(index)
                }
                // условие:
                if(!prevRows.some(row => row === this.minRowWidth) && deltaPercent < 0 && !isOverflow) {
                    this.rowsPercentage[index] = initialWidth + deltaPercent;
                    return this.adjustRowWidths(index)
                }
                // условие: если в результате сдвига соседних колонок текущая стала больше maxRowWidth
                if(initialWidth >= this.maxRowWidth && deltaPercent < 0 && !isOverflow) {
                    this.rowsPercentage[index] = initialWidth + deltaPercent;
                    return this.adjustRowWidths(index)
                }

            })
        };

        const mouseUpHandler = () => {
            document.removeEventListener('mouseup', mouseUpHandler);
            document.removeEventListener('mousemove', mouseMoveHandler);
            this.isResizing = false;
        };

        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    }
    @action
    private adjustRowWidths(from: number) {
        // Корректируем все колонки, чтобы их суммарная ширина была 100%
        const scaleFactor = 100 / this.rowsTotalWidth;
        let adjustedTotal = 0;

        // Масштабируем каждую колонку, кроме последней
        this.rowsPercentage = this.rowsPercentage.map((row, index) => {
            if (index < this.rowsPercentage.length - 1) {
                const adjustedWidth = index >= from ? Math.max(this.minRowWidth, row * scaleFactor) : row;
                adjustedTotal += adjustedWidth;
                return adjustedWidth;
            } else {
                // Последней колонке назначаем оставшуюся ширину, чтобы итоговая сумма была ровно 100%
                const remainingWidth = 100 - adjustedTotal;
                return Math.max(this.minRowWidth, remainingWidth);
            }
        });
    }

    private compare(key: keyof TRawUser, isASC: boolean, a: TRawUser, b: TRawUser) {
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

    @action
    private sortingReaction() {
        reaction(() => this.usersModel.rawData, () => {
            if(this.sorting) {
                this.usersModel.rawData = this.usersModel.rawData.sort((a, b) => (
                    this.compare(this.sorting!.key, this.sorting!.isASC, a, b)
                ))
            }
        })
    }

    constructor(private usersModel: UsersModel) {
        super();
        makeObservable(this)
        this.sortingReaction()
    }

}