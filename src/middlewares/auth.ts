import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { ForbiddenError, UnAuthorizedError } from '../custom-errors/';
import { JwtUtil } from '../utils';
import { UserRoleEnum } from '../models/user';

class AuthMiddleware {
  public async authenticate(req: Request, res: Response, next: NextFunction) {
    const { token } = req.signedCookies;
    console.log(token);
    if (!token) {
      throw new UnAuthorizedError('Authentication failed');
    }

    try {
      const { name, userId, role } = JwtUtil.tokenPayload(token) as JwtPayload;

      console.log(`Payload: `, name, userId, role);
      req.user = {
        name,
        userId,
        role
      };
      next();
    } catch (error) {
      console.log(error);
      throw new UnAuthorizedError('Authentication failed');
    }
  }

  public authorizeByRole(...roles: string[]): any {
    return (req: Request, res: Response, next: NextFunction) => {
      const role = req.user?.role || '';
      if (!roles.includes(role)) {
        throw new ForbiddenError('Access Denied!');
      }
      next();
    };
  }

}
export const authMiddleware = new AuthMiddleware();
