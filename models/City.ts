import { Document, Schema, Model, model } from 'mongoose';

const CitySchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
});
