const mongoose = require('mongoose');

const BandSchema = new mongoose.Schema({
  name: String,
  instances: Array,
});

const Band = mongoose.model('band', BandSchema);
module.exports = Band;
