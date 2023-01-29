import jwt, { JwtPayload } from 'jsonwebtoken';

export class JwtUtil {
  public static createJwtToken(payload: any): string {
    const token = jwt.sign(payload, process.env.JWT_SECRET || '', {
      expiresIn: process.env.JWT_LIFETIME || '1d'
    });
    return token;
  }

  public static tokenPayload(token: string): JwtPayload | string {
    const payload: jwt.JwtPayload | string = jwt.verify(
      token,
      process.env.JWT_SECRET || ''
    );

    return payload;
  }
}
