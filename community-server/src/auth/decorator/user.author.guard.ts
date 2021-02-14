import { Injectable, CanActivate, ExecutionContext, NotFoundException } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { BoardService } from "src/board/board.service";
import { Observable } from "rxjs";
import { User, Board } from "../../../../domains/dist/domains";

@Injectable()
export class UserAuthorGuard implements CanActivate {
    constructor(
        private userService: UserService,
        private boardService: BoardService
    ) { }
    async canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest();
        const params = req.params;
        const boardId: number = Number(params.id)
        const user: User = req.user
        let hasPermission = false
        const board: Board = await this.boardService.getBoard(boardId)

        if (user.id === board.userId) {
            hasPermission = true

            return user && hasPermission
        }
    }
}