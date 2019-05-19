import { Document } from 'mongoose';
import { Request } from 'express';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar: string;
  date: Date;
}

export interface IUserAuth extends Request {
  user: {
    id: string,
    name: string,
    email: string,
    password: string,
    avatar: string,
    date: Date,
  };
}

export interface IProfile extends Document {
  user: IUser;
  location: String;
}
