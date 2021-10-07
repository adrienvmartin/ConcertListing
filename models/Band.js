const mongoose = require('mongoose');

const BandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  instances: {
    type: Number,
    required: false,
  }
});

const Band = mongoose.model('band', BandSchema);
module.exports = Band;
