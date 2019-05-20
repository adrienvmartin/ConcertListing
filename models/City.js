const mongoose = require('mongoose');

const CitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const City = mongoose.model('city', CitySchema);
export default City;
