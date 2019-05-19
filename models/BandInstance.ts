import { Document, Schema, Model, model } from 'mongoose';

const BandInstanceSchema: Schema = new Schema({
  band: {
    type: String,
  },
  status: {
    type: String,
    required: true,
  },
});
