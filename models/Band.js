const mongoose = require('mongoose');

const BandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
  ],
});

const Band = mongoose.model('band', BandSchema);
module.exports = Band;
