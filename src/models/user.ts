import mongoose, { Schema, model } from 'mongoose';
import validator from 'validator';

export enum UserRoleEnum {
  ADMIN = 'ADMIN',
  USER = 'USER'
}
export interface IUser {
  name: string;
  email: string;
  password: string;
  role: UserRoleEnum;
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [
      true,
      'Please provide a name that is at least 3 chars long and does not exceed 50 chars'
    ],
    maxlength: 50,
    minlength: 3
  },
  email: {
    type: String,
    validate: [validator.isEmail, 'Please provide a valid email address'],
    required: [true, 'Please provide a valid email address'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password is mandatory'],
    minlength: 6
  },
  role: {
    type: String,
    enum: UserRoleEnum,
    default: UserRoleEnum.USER
  }
});

export const User = model<IUser>('User', UserSchema);
