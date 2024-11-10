import {ViewModel} from "@yoskutik/react-vvm";
import {keys} from "lodash";
import {object, string} from "yup";
import {REQUIRED_VALIDATION_MESSAGE as REQUIRED_MESSAGE} from "@constants";
import {Regexp} from "@constants";
import {UsersModel} from "@models";


export abstract class UserFormViewModel extends ViewModel {
    abstract usersModel: UsersModel;
    abstract onSubmit(form: IUserForm, goBack: () => void, userId?: string): void;
    initialValues: IUserForm | null = {
        name: "",
        email: "",
        website: "",
        phoneNumber: "",
        birthdate: ""
    }
    inputs = keys(this.initialValues) as (keyof IUserForm)[]
    validationSchema = object({
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
}