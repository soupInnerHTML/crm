import {object, ObjectSchema, string} from 'yup';
import {keys} from "lodash";
import {Regexp} from "./validation/regexp";
import {REQUIRED_VALIDATION_MESSAGE as REQUIRED_MESSAGE} from './validation/messages'

export const addUserFormInitialValues: IUserForm = {
    name: "",
    email: "",
    website: "",
    phoneNumber: "",
    birthdate: ""
}

export const addUserFormInputs = keys(addUserFormInitialValues) as (keyof IUserForm)[];

export const addUserFormValidationSchema: ObjectSchema<IUserForm> = object({
    name: string().required(REQUIRED_MESSAGE),
    email: string().email('Invalid email').required(REQUIRED_MESSAGE),
    website: string()
        .required(REQUIRED_MESSAGE)
        .matches(Regexp.WEBSITE, "Invalid website. Example: google.com"),
    birthdate: string()
        .matches(Regexp.DATE, "Date of birth must be in DD.MM.YYYY format")
        .required(REQUIRED_MESSAGE),
    phoneNumber: string()
        .matches(Regexp.PHONE_NUMBER, 'Invalid phone number. Example: +79092621560, 79092621560, 89092621560')
        .required(REQUIRED_MESSAGE)
});