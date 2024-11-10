import {injectable} from "tsyringe";
import {UsersModel} from "@models";
import {UserFormViewModel} from "./userFormViewModel";
import {ViewModel} from "@yoskutik/react-vvm";
import {flow} from "mobx";

@injectable()
export class AddUserFormViewModel extends UserFormViewModel implements ViewModel<unknown, unknown> {
    @flow *onSubmit(form: IUserForm, goBack: () => void) {
        yield this.usersModel.addUser(form)
        goBack()
        alert("User added successfully!");
    }

    constructor(readonly usersModel: UsersModel) {
        super();
    }
}