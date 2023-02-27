import { HttpStatus } from '@nestjs/common';
import { ApiException } from 'src/exceptions/api.exception';

export class AuthExceptions extends ApiException {
  static UserNotExist() {
    return super.newException(
      'Пользователь с таким id не найден',
      HttpStatus.NOT_FOUND,
    );
  }

  static UserAlreadyExist() {
    return super.newException(
      'Пользователь с таким email уже существует',
      HttpStatus.BAD_REQUEST,
    );
  }

  static WrongAuthData() {
    return super.newException(
      'Неправильный email или пароль',
      HttpStatus.BAD_REQUEST,
    );
  }
}
