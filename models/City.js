const mongoose = require('mongoose');

const CitySchema = new mongoose.Schema({
  name: {
    type: String,
    instances: Array,
    required: true,
  },
});

const City = mongoose.model('city', CitySchema);
module.exports = City;
