const mongoose = require('mongoose');

const BandSchema = new mongoose.Schema({
  name: String,
});

module.exports = Band = mongoose.model('band', BandSchema);
