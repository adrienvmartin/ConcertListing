const mongoose = require('mongoose');

const CitySchema = new mongoose.Schema({
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
  venues: [{ type: mongoose.Schema.Types.ObjectId, ref: 'venue' }],
});

const City = mongoose.model('city', CitySchema);
module.exports = City;
