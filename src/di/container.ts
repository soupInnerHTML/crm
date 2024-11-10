import {configure} from "@yoskutik/react-vvm";
import {container} from "tsyringe";
import {UsersModel} from "@models";

container.resolve(UsersModel)

configure({
    vmFactory: VM => container.resolve(VM)
});