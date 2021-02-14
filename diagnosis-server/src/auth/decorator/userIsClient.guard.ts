import {
    Injectable,
    CanActivate,
    ExecutionContext
} from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { User } from "../../../../domains/dist/domains";

@Injectable()
export class UserIsClient implements CanActivate {
    constructor(
        private userService: UserService,
    ) { }
    async canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest();
        const user: User = req.user
        let hasPermission = false
        console.log(user);
        console.log("userIs role", user.role);
        if (user.role === "Client") {
            hasPermission = true

            return user && hasPermission
        }
    }
}