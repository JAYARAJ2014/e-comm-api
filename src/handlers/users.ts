import { Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { IUser, User, UserRoleEnum } from '../models/user';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import {
  BadRequestError,
  NotFoundError,
  UnAuthorizedError
} from '../custom-errors';
import bcrypt from 'bcryptjs';
import { rmSync } from 'fs';
import { JwtUtil } from '../utils';
import { userInfo } from 'os';

export class UsersHandler {
  public async createUser(req: Request, res: Response) {
    res.send('createUser');
  }
  public async getAllUsers(req: Request, res: Response) {
    console.log(`User: ${req.user?.name}`);
    const users = await User.find({ role: UserRoleEnum.USER }).select(
      '-password'
    );
    return res.status(StatusCodes.OK).json(users);
  }
  public async getSingleUser(req: Request, res: Response) {
    const userId = req.params.id;

    const user = await User.findOne({
      _id: userId,
      role: UserRoleEnum.USER
    }).select('-password');
    if (!user) {
      throw new NotFoundError(`User with id ${userId} does not exist`);
    }

    return res.status(StatusCodes.OK).json(user);
  }
  public async showCurrentUser(req: Request, res: Response) {
    res.status(StatusCodes.OK).json({ user: req.user });
  }
  public async updateCurrentUser(req: Request, res: Response) {
    console.log('Update invoked');
    const { email, name } = req.body;
    if (!email || !name) {
      throw new BadRequestError('email & name must be provided');
    }

    if (!req.user) {
      throw new UnAuthorizedError('Not logged in');
    }

    const user = await User.findOneAndUpdate(
      { _id: req.user?.userId },
      { email, name },
      { new: true, runValidators: true }
    );
    if (!user) {
      throw new NotFoundError('Specified user does not exist');
    }
    const tokenPayload = { name: user.name, userId: user._id, role: user.role };
    JwtUtil.attachCookiesToResponse(tokenPayload, res);
    res.status(StatusCodes.OK).json({ user: user });
  }
  public async updateUserPassword(req: Request, res: Response) {
    const { currentPassword, newPassword } = req.body;
    if (!req.user) {
      throw new UnAuthorizedError('You are not logged in');
    }
    if (!currentPassword || !newPassword) {
      throw new BadRequestError(
        'Both current and new password must be provided'
      );
    }

    const userId = req.user?.userId;
    const user = await User.findOne({ _id: userId });
    if (!user) {
      throw new UnAuthorizedError('You are not logged in');
    }
    const doesPasswordsMatch = await user?.comparePasswordHash(currentPassword);

    if (!doesPasswordsMatch) {
      throw new UnAuthorizedError('Password incorrect.');
    }

    user.password = newPassword;
    await user.save();
    res.status(StatusCodes.OK).json({ message: 'Password updated' });
  }
}
