import { Document, Schema, Model, model } from 'mongoose';
import { IUser } from './User';

export interface IProfile extends Document {
  user: IUser['_id'];
  location: String;
}

const mongoose = require('mongoose');

const ProfileSchema: Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  location: {
    type: String,
  },
});

export const Profile: Model<IProfile> = model<IProfile>('profile', ProfileSchema);
