import { Injectable, CanActivate, ExecutionContext, Inject, forwardRef } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserService } from "src/user/user.service";
import { User } from "../../../domains/dist/domains";



@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,

        @Inject(forwardRef(() => UserService))
        private userService: UserService
    ) { }

    async canActivate(context: ExecutionContext) {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const handlerUser: User = request.user;

        const user = await this.userService.findByEmail(handlerUser.email)
        const hasRole = () => roles.indexOf(user.role) > -1;
        let hasPermission: boolean = false;

        if (hasRole()) {
            hasPermission = true;
        };
        return user && hasPermission;

    }
}