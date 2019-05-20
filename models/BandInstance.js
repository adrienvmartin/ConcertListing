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

const BandInstance = mongoose.model('bandInstance', BandInstanceSchema);
module.exports = BandInstance;
