const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'event' }],
  bands: [{ type: mongoose.Schema.Types.ObjectId, ref: 'band' }],
  cities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'city' }],
  venues: [{ type: mongoose.Schema.Types.ObjectId, ref: 'venue' }],
});

const Profile = mongoose.model('profile', ProfileSchema);
module.exports = Profile;
