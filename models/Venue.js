const mongoose = require('mongoose');

const VenueSchema = new mongoose.Schema({
  name: {
    type: String,
    instances: Array,
    required: true,
  },
});

const Venue = mongoose.model('venue', VenueSchema);
module.exports = Venue;
