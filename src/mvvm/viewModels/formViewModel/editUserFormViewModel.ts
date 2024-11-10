import {injectable} from "tsyringe";
import {UsersModel} from "@models";
import {UserFormViewModel} from "./userFormViewModel";
import {ViewModel} from "@yoskutik/react-vvm";
import {action, flow, makeObservable, observable, reaction} from "mobx";
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import {omit} from "lodash";
import {SERVER_DATE_FORMAT, UI_DATE_FORMAT} from "@constants";

dayjs.extend(customParseFormat);

@injectable()
export class EditUserFormViewModel extends UserFormViewModel implements ViewModel<unknown, unknown> {
    @observable initialValues: IUserForm | null = null;
    @observable userId: string | null = null;
    @action setUser(userId: string) {
        this.userId = userId
    }

    @flow *onSubmit(form: IUserForm, goBack: () => void, userId: string) {
        yield this.usersModel.editUser({
            ...form,
            birthdate: dayjs(form.birthdate, UI_DATE_FORMAT).format(SERVER_DATE_FORMAT)
        }, userId)
        goBack()
        alert("User edited successfully!");
    }

    @flow *getUserData(id: string) {
        const target = this.usersModel.rawData.find(user => user.id === id);
        if(target) {
            this.initialValues = {
                ...omit(target, "age"),
                birthdate: dayjs(target.birthdate).format(UI_DATE_FORMAT)
            };
        }
    }

    userIdReaction() {
        reaction(() => this.userId, (id) => id && this.getUserData(id));
    }

    constructor(readonly usersModel: UsersModel) {
        super();
        makeObservable(this)
        this.userIdReaction()
    }
}