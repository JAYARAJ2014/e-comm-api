// When this is implemented, the try-catch block has been removed from handlers

import { Request, Response, NextFunction } from 'express';

export const handleAsyncMiddleware = (fn: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};