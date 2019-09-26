const mongoose = require('mongoose');

const VenueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  instanceCount: {
    type: Number,
    required: true,
    default: 0,
  },
  instances: [{ type: mongoose.Schema.Types.ObjectId, ref: 'event' }],
  bands: [{ type: mongoose.Schema.Types.ObjectId, ref: 'band' }],
});

const Venue = mongoose.model('venue', VenueSchema);
module.exports = Venue;
