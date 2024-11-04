import React, {useMemo} from 'react';
import cs from "classnames";
import {Input} from "../@common/Input";
import {Error} from '../@common/Error'
import {camelCaseToText} from "../../utils/camelCaseToText";

interface IAddUserFormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    touched?: boolean;
    error?: string;
}

export const AddUserFormInput: React.FC<IAddUserFormInputProps> = ({touched, error, ...props}) => {
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

