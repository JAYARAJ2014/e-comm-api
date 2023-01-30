import mongoose, { Schema, model } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

export enum UserRoleEnum {
  ADMIN = 'ADMIN',
  USER = 'USER'
}
export interface IUser {
  name: string;
  email: string;
  password: string;
  role: UserRoleEnum;
  comparePasswordHash(inputPassword: string): boolean;
}
// export interface IHashComparable {
//   comparePasswordHash(): boolean;
// }

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

UserSchema.pre('save', async function name() {

  if (!this.isModified('password')) {
    return; 
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
UserSchema.method('comparePasswordHash', async function (inputPassword) {
  return await bcrypt.compare(inputPassword, this.password);
});
export const User = model<IUser>('User', UserSchema);
