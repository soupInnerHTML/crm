import React from "react";

export const Container: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
    return (
        <main className={'container'} {...props} />
    );
};