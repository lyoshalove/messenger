import { createParamDecorator, UnauthorizedException } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data, [root, args, ctx, info]) => {
    if (ctx.req.user) return ctx.req.user;

    throw new UnauthorizedException();
  },
);
