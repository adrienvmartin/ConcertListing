const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  bands: {
    headliner: {
      type: String,
      required: true,
    },
    openers: [
      {
        type: String,
        required: false,
      },
    ],
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
  tourName: {
    type: String,
    required: false,
  },
  tourType: {
    type: String,
    required: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
});

const Concert = mongoose.model('concert', EventSchema);
module.exports = Concert;
