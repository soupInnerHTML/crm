import React, {useCallback, useMemo} from "react";
import {camelCaseToText} from "../../../../utils/camelCaseToText";
import cs from "classnames";

interface IUserTableHeaderProps {
    header: UserTableHeader;
    sorting: ISortingField | null;
    setSorting: React.Dispatch<React.SetStateAction<ISortingField | null>>;
    index: number
}

export const UserTableHeader: React.FC<IUserTableHeaderProps> = ({
  header,
  sorting,
  setSorting,
}) => {
    const readableHeader = useMemo(() => camelCaseToText(header), [header])
    const sort = useCallback(() => {
        if(sorting && sorting.key === header) {
            //@ts-ignore TODO: fix
            setSorting(current => ({...current, isASC: !current.isASC}))
        }
        else {
            setSorting({key: header as UserTableHeaderSorting, isASC: true})
        }
    }, [header, sorting, setSorting])

    // const [use]

    // Todo fix
    function resize(e: any) {
        // console.log(e.target)
        const startX = e.clientX;

        e.preventDefault();
    }

    return <div className="user-table__header" onMouseMove={resize}>
        {readableHeader && <p
            onClick={sort}
            className={cs("user-table__header__text", {
                'user-table__header__text_sorted': sorting?.isASC && sorting.key === header
            })}
        >
            {readableHeader}
        </p>}
    </div>
}