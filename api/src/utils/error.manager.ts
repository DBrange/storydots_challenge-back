import { HttpException, HttpStatus } from '@nestjs/common';

type ErrorType = {
  type: keyof typeof HttpStatus;
  message: string;
};

export class ErrorManager extends Error {
  constructor({ type, message }: ErrorType) {
    super(`${type} :: ${message}`);
  }

  public static createAsignaturError(message: string) {
    const name = message.split(' :: ')[0];

    if (name) {
      throw new HttpException(message, HttpStatus[name]);
    } else {
      throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
