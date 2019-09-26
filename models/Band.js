const mongoose = require('mongoose');

const BandSchema = new mongoose.Schema({
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
  cities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'city' }],
  venues: [{ type: mongoose.Schema.Types.ObjectId, ref: 'venue' }],
});

const Band = mongoose.model('band', BandSchema);
module.exports = Band;
