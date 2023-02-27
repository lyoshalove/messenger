import { HttpStatus } from '@nestjs/common';
import { ApiException } from 'src/exceptions/api.exception';

export class UsersExceptions extends ApiException {
  static WrongUserData() {
    return super.newException(
      'Неправильно введены данные',
      HttpStatus.BAD_REQUEST,
    );
  }
}
