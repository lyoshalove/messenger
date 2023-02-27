import { HttpException } from '@nestjs/common';

export class ApiException extends HttpException {
  constructor(message: string | string[], statusCode: number) {
    super({ message }, statusCode);
  }

  static newException(message: string | string[], statusCode: number) {
    return new ApiException(message, statusCode);
  }
}
