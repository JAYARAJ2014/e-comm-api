import { Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { IUser, User } from '../models/user';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { BadRequestError, UnAuthorizedError } from '../custom-errors/';
import bcrypt from 'bcryptjs';
import { rmSync } from 'fs';
import { JwtUtil } from '../utils/jwt';

class AuthHandler {
  public async register(req: Request, res: Response) {
    const { email, name, password, role: UserRoleEnum } = req.body;
    const alredyExistingUser: IUser | null = await User.findOne({
      email: email
    });

    if (alredyExistingUser) {
      throw new BadRequestError('The specified email  already exists');
    }
    const firstUser: boolean = (await User.countDocuments({})) === 0;
    const role = firstUser ? 'ADMIN' : 'USER';
    const user = await User.create({ name, email, password, role });
    const tokenPayload = { name: user.name, userId: user._id, role: user.role };
    JwtUtil.attachCookiesToResponse(tokenPayload, res);

    res.status(StatusCodes.CREATED).json({ user: tokenPayload });
  }
  public async login(req: Request, res: Response) {
    console.log(req.body);
    const { email, password } = req.body;
    if (!email || !password) {
      throw new UnAuthorizedError('Please provide email and password');
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      throw new UnAuthorizedError('User does not exist. Please register');
    }

    const doesPasswordsMatch = await user.comparePasswordHash(password);
    console.log(doesPasswordsMatch);

    if (!doesPasswordsMatch) {
      throw new UnAuthorizedError('UserId Or Password Incorrect');
    }
    const tokenPayload = { name: user.name, userId: user._id, role: user.role };
    JwtUtil.attachCookiesToResponse(tokenPayload, res);

    return res.status(StatusCodes.OK).json({ name: 'hELLO' });
  }

  public async logout(req: Request, res: Response) {
    res.cookie('token', undefined, {
      expires: new Date(Date.now())
    });
    res.status(StatusCodes.OK).json({ message: 'Logged out' });
  }
}

export const authHandler = new AuthHandler();
