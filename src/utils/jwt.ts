import { Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export class JwtUtil {
  private static createJwtToken(payload: any): string {
    const token = jwt.sign(payload, process.env.JWT_SECRET || '', {
      expiresIn: process.env.JWT_LIFETIME || '1d'
    });

    return token;
  }

  public static attachCookiesToResponse(payload: any, res: Response): void {
    const token = this.createJwtToken(payload);
    res.cookie('token', token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      signed: true
    });
  }
  public static tokenPayload(token: string): JwtPayload | string {
    const payload: jwt.JwtPayload | string = jwt.verify(
      token,
      process.env.JWT_SECRET || ''
    );

    return payload;
  }
}
