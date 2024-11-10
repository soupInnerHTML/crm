import {ViewModel} from "@yoskutik/react-vvm";
import {injectable} from "tsyringe";
import {UsersModel} from "@models";

@injectable()
export class MainViewModel extends ViewModel {
    constructor(readonly usersModel: UsersModel) {
        super();
    }
}