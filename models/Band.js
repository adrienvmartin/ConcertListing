const mongoose = require('mongoose');

const BandSchema = new mongoose.Schema({
  name: String,
});

const Band = mongoose.model('band', BandSchema);
export default Band;
