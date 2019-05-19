const mongoose = require('mongoose');

const BandInstanceSchema = new mongoose.Schema({
  band: {
    type: String,
  },
  status: {
    type: String,
    required: true,
  },
});

module.exports = BandInstance = mongoose.model('bandInstance', BandInstanceSchema);
