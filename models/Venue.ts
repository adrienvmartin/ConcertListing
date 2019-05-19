import { Document, Schema, Model, model } from 'mongoose';

const VenueSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
});
