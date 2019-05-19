const mongoose = require('mongoose');

const VenueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = Venue = mongoose.model('venue', VenueSchema);
