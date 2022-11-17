import { createParamDecorator, UnauthorizedException } from '@nestjs/common';

interface ICurrentUser {
  required?: boolean;
}

export const CurrentUser: (options?: ICurrentUser) => ParameterDecorator =
  createParamDecorator((options: ICurrentUser = {}, req) => {
    const user = req.args[2].user;

    if (options.required && !user) {
      throw new UnauthorizedException();
    }

    return user;
  });
