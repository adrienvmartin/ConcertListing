import { Document, Schema, Model, model } from 'mongoose';

const EventSchema: Schema = new Schema({
  bands: {
    headliner: {
      type: Schema.Types.ObjectId,
      ref: 'band',
      required: true,
    },
    openers: {
      type: Array,
      required: false,
    },
  },
  date: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
});

