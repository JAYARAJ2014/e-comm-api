import { NextFunction, Request, Response } from 'express';
import { v4 as uuidV4 } from 'uuid';
export const requestContext = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const requestId = req.headers['ecomm-api-request-id'] || 'auto-' + uuidV4();

  res.setHeader('ecomm-api-request-id', requestId);

  next();
};
