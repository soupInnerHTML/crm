import { Container } from 'inversify';
import {UserStore} from "../store/users";
import {configure} from "@yoskutik/react-vvm";
// import {UserTableViewModel} from "../viewModels/userTableViewModel";


export const container = new Container();
// container.register<UserTableViewModel>('UserTableViewModel', { useClass: UserTableViewModel })

configure({
    vmFactory: VM => container.resolve(VM),
});

container.resolve(UserStore);