import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context).getContext();
    if (!ctx.headers.authorization) {
      return false;
    }

    ctx.user = await this.validateToken(ctx.headers.authorization);
  }

  validateToken(auth: string) {
    if (auth.split(' ')[0] !== 'Bearer') {
      throw new HttpException('Невалидный токен', HttpStatus.UNAUTHORIZED);
    }

    const token = auth.split(' ')[1];

    try {
      return jwt.verify(token, 'secret');
    } catch (e) {
      throw new HttpException('Невалидный токен', HttpStatus.UNAUTHORIZED);
    }
  }
}
