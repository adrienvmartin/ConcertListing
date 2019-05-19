const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
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

module.exports = Concert = mongoose.model('concert', EventSchema);
