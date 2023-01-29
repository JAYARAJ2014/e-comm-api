import { StatusCodes } from 'http-status-codes';
import { CustomApiError } from './custom-api';

export class ForbiddenError extends CustomApiError {
  statusCode: number;
  constructor(public messsage: string) {
    super(messsage);
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}
