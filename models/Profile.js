const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'concert' }],
});

const Profile = mongoose.model('profile', ProfileSchema);
module.exports = Profile;
