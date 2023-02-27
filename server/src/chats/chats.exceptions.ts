import { HttpStatus } from '@nestjs/common';
import { ApiException } from 'src/exceptions/api.exception';

export class ChatsExceptions extends ApiException {
  static ChatNotExist() {
    return super.newException(
      'Чат с таким id не существует',
      HttpStatus.BAD_REQUEST,
    );
  }
}
