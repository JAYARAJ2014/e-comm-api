import { Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { User } from '../models/user';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, UnAuthorizedError } from '../custom-errors/';
import bcrypt from 'bcryptjs';

class AuthHandler {
  public async register(req: Request, res: Response) {
    const { username, email, password } = req.body;
    if (!username || !password || !email) {
      throw new BadRequestError('Required input is not provided.');
    }

    const user = await User.create({ ...req.body });
    const token = jwt.sign(
      { userId: user._id, name: user.name },
      process.env.JWT_SECRET as string,
      {
        expiresIn: process.env.JWT_LIFE_TIME as string
      }
    );
    console.log(`User Created:  `, user);
    return res
      .status(StatusCodes.OK)
      .json({ user: { userId: user._id, name: username }, token: token });
  }
  public async login(req: Request, res: Response) {
    const { email, password } = req.body;
    if (!password || !email) {
      throw new BadRequestError('email / Password must be provided.');
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new UnAuthorizedError('User does not exist');
    }

    // Compared the passwords

    const isPasswordsMatching = await bcrypt.compare(password, user.password);

    if (!isPasswordsMatching) {
      throw new UnAuthorizedError('Invalid Password');
    }

    const token = jwt.sign(
      { userId: user._id, name: user.name },
      process.env.JWT_SECRET as string,
      {
        expiresIn: process.env.JWT_LIFE_TIME as string
      }
    );

    return res.status(StatusCodes.OK).json({ name: user.name, token });
  }

  public async logout(req: Request, res: Response) {
    res.status(StatusCodes.OK).json({ message: 'Logged out' });
  }
}

export const authHandler = new AuthHandler();
