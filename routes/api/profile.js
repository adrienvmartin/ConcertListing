const express = require('express');
const { check, validationResult } = require('express-validator/check');
const { SERVER_ERROR_MSG, NO_PROFILE_MSG } = require('../../utils/constants');
const Profile = require('../../models/Profile');
const concert = require('../../models/Event');
const Band = require('../../models/Band');
const City = require('../../models/City');
const Venue = require('../../models/Venue');
const User = require('../../models/User');
const auth = require('../../middleware/auth');

const router = express.Router();

router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['name', 'events']
    );

    if (!profile) {
      return res.status(400).json({ msg: NO_PROFILE_MSG });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(SERVER_ERROR_MSG);
  }
});

router.post('/', [auth], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const profileFields = {};
  profileFields.user = req.user.id;

  try {
    let profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );

      return res.json(profile);
    }

    profile = new Profile(profileFields);

    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'events']);
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

router.get('/events', auth, async (req, res) => {
  try {
    const events = await concert.find({ user: req.user.id }).sort({ date: -1 });
    res.json(events);
  } catch (err) {
    res.status(500).send({ msg: SERVER_ERROR_MSG });
  }
});

router.get('/bands', auth, async (req, res) => {
  try {
    const events = await concert.find({ user: req.user.id });
    const bandList = [];
    events.forEach(e => {
      bandList.push(e.bands.headliner, e.bands.openers[0]);
    });
    bandList.sort();
    res.json(bandList);
  } catch (err) {
    res.status(500).send({ msg: SERVER_ERROR_MSG });
    console.error(err);
  }
});

router.get('/cities', auth, async (req, res) => {
  try {
    const events = await concert.find({ user: req.user.id });
    const citiesList = [];
    events.forEach(e => {
      citiesList.push(e.city);
    });
    const noDupes = citiesList.filter((item, index) => {
      return citiesList.indexOf(item) >= index;
    });
    noDupes.sort();
    res.json(noDupes);
  } catch (err) {
    res.status(500).send({ msg: SERVER_ERROR_MSG });
    console.error(err);
  }
});

router.get('/venues', auth, async (req, res) => {
  try {
    const events = await concert.find({ user: req.user.id });
    const venueList = [];
    events.forEach(e => {
      venueList.push(e.venue);
    });
    const filteredList = venueList.filter((item, index) => {
      return venueList.indexOf(item) >= index;
    });
    filteredList.sort();
    res.json(filteredList);
  } catch (err) {
    res.status(500).send({ msg: SERVER_ERROR_MSG });
    console.error(err);
  }
});

// Create new event
router.put(
  '/events',
  [
    auth,
    [
      check('bands.headliner', 'At least one band is required')
        .not()
        .isEmpty(),
      check('venue', 'Venue is required')
        .not()
        .isEmpty(),
      check('city', 'City is required')
        .not()
        .isEmpty(),
      check('date', 'Date is required')
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('There was an error!');
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      bands: { headliner, openers },
      city,
      venue,
      date,
    } = req.body;

    const newShow = {
      bands: {
        headliner,
        openers,
      },
      city,
      venue,
      date,
      user: req.user.id,
    };

    try {
      const event = new concert({
        bands: newShow.bands,
        city: newShow.city,
        venue: newShow.venue,
        date: newShow.date,
        user: req.user.id,
      });

      await event.save();

      res.json(event);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  }
);

// Delete event
router.delete('/events/:event_id', auth, async (req, res) => {
  try {
    const foundProfile = await Profile.findOne({ user: req.user.id });
    const eventIds = foundProfile.events.map(ev => ev._id.toString());
    const removeIndex = eventIds.indexOf(req.params.event_id);
    if (removeIndex === -1) {
      return res.status(500).json({ msg: 'Server error' });
    } else {
      console.log('eventIds', eventIds);
      console.log('typeOf eventIds', typeof eventIds);
      console.log('req.params', req.params);
      console.log('removed', eventIds.indexOf(req.params.event_id));
      foundProfile.events.splice(removeIndex, 1);
      await foundProfile.save();
      return res.status(200).json(foundProfile);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
