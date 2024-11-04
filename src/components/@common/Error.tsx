import React, {PropsWithChildren} from 'react';

export const Error: React.FC<PropsWithChildren> = ({children}) => {
    return <p className={'error'}>{children}</p>;
};

