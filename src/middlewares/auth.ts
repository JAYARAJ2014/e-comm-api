import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UnAuthorizedError } from '../custom-errors/';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  console.log(authorization);
  if (!authorization || !authorization.startsWith('Bearer')) {
    req.user = null;
    throw new UnAuthorizedError('Invalid Token. Access Denied');
  }

  const token = authorization.substring(7);

  try {
    var payload: JwtPayload = (await jwt.verify(
      token,
      process.env.JWT_SECRET as string
    )) as JwtPayload;
    console.log(`Payload: `, typeof payload);
    req.user = { userId: payload.userId, username: payload.name };

    // console.log(req.user);
    next();
  } catch (error) {
    req.user = null;
    console.log(`Error in verifying JWT `, error);
    throw new UnAuthorizedError('Invalid Token. Access Denied');
  }
};