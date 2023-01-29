import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UnAuthorizedError } from '../custom-errors/';
import { JwtUtil } from '../utils';


export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.signedCookies;
  console.log(token)
  if (!token) {
    throw new UnAuthorizedError('Authentication failed')
  }

  try {
    const { name, userId, role }  = JwtUtil.tokenPayload(token) as JwtPayload;
     
    console.log(`Payload: `, name, userId, role)
    req.user = {
      name, userId, role
    }
    next();
  } catch (error) {
    console.log(error) 
    throw new UnAuthorizedError('Authentication failed')
  } 
   
   
};
