import React, {useMemo} from 'react';
import cs from "classnames";
import {Input, Error} from "@library";
import {camelCaseToText} from "@utils";

interface IUserFormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    touched?: boolean;
    error?: string;
}

export const UserFormInput: React.FC<IUserFormInputProps> = ({touched, error, ...props}) => {
    const isInvalid = touched && error;
    const placeholder = useMemo(() => camelCaseToText(props.name!), [props.name])
    return (
        <div className={cs('add-user-form__field', {'add-user-form__field_error': isInvalid})}>
            <Input
                placeholder={placeholder}
                {...props}
            />
            {isInvalid && <Error>{error}</Error>}
        </div>
    );
};

