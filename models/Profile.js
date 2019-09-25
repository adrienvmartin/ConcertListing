const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  events: [
    {
      bands: {
        headliner: {
          type: String,
          required: true,
        },
        openers: [
          {
            type: String,
            required: false,
          },
        ],
      },
      city: {
        type: String,
        required: true,
      },
      venue: {
        type: String,
        required: true,
      },
      date: {
        type: String,
        required: true,
      },
    },
  ],
});

const Profile = mongoose.model('profile', ProfileSchema);
module.exports = Profile;
