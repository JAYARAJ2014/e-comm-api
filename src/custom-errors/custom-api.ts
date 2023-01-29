import { StatusCodes } from 'http-status-codes';

export class CustomApiError extends Error {
  constructor(public messsage: string) {
    super(messsage);
  }
  statusCode!: StatusCodes;
}
