import {
    Injectable,
    CanActivate,
    ExecutionContext
} from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { BoardService } from "src/board/board.service";
import { User } from "../../../../domains/dist/domains";

@Injectable()
export class UserIsClient implements CanActivate {
    constructor(
        private userService: UserService,
        private boardService: BoardService
    ) { }
    async canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest();
        const user: User = req.user
        let hasPermission = false
        if (user.role === "Client") {
            hasPermission = true

            return user && hasPermission
        }
    }
}