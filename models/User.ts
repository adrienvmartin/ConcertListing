import { Document, Schema, Model, model } from 'mongoose';
import { Request } from 'express';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar: string;
  date: Date;
}

export interface IUserAuth extends Request {
  user: IUser['_id'];
}

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export const User: Model<IUser> = model<IUser>('user', UserSchema);
