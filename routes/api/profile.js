import { SERVER_ERROR_MSG, NO_PROFILE_MSG } from '../../utils/constants';
import Profile from '../../models/Profile';
import User from '../../models/User';

const express = require('express');

const router = express.Router();
const auth = require('../../middleware/auth');

router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: NO_PROFILE_MSG });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send(SERVER_ERROR_MSG);
  }
});

router.post('/', auth, async (req, res) => {
  try {
    let profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
      return res.json(profile);
    }
    profile = new Profile();
    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(500).send(SERVER_ERROR_MSG);
  }
});

router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(SERVER_ERROR_MSG);
  }
});

router.delete('/', async (req, res) => {
  try {
    await Profile.findOneAndRemove({ user: req.user.id });
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send(SERVER_ERROR_MSG);
  }
});

module.exports = router;
