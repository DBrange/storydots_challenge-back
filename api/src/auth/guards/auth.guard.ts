import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/users/service/user.service';
import { Reflector } from '@nestjs/core';
import { PUBLIC_KEY } from 'src/constants/key-decorators';
import { Request } from 'express';
import { useToken } from 'src/utils/use.token';
import { IUseToken } from '../interfaces/auth.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get<boolean>(
      PUBLIC_KEY,
      context.getHandler(),
    );
    if (isPublic) return true;

    const req = context.switchToHttp().getRequest<Request>();
    const token = req.headers['storydots_token'];
    if (!token || Array.isArray(token))
      throw new UnauthorizedException('Invalid token');

    const manageToken: IUseToken | string = useToken(token);
    if (typeof manageToken === 'string')
      throw new UnauthorizedException(manageToken);
    if (manageToken.isExpired)
      throw new UnauthorizedException('Season expired');

    const { sub } = manageToken;
    const user = await this.userService.findUserById(sub);

    if (!user) throw new UnauthorizedException('Season expired');

    req.idUser = user?.id
    req.roleUser = user?.role

    return true;
  }
}
