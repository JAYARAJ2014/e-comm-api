import { Errback, Request, Response, NextFunction } from 'express';
import { CustomApiError } from '../custom-errors'
import { StatusCodes } from 'http-status-codes';
export const errorHandlerMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomApiError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ messgae: err });
};