const express = require('express');
const { check, validationResult } = require('express-validator/check');
const { SERVER_ERROR_MSG, NO_PROFILE_MSG } = require('../../utils/constants');
const Profile = require('../../models/Profile');
const concert = require('../../models/Event');
const band = require('../../models/Band');
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
    const profile = await Profile.findOne({ user: req.user.id })
      .populate('user')
      .populate('events')
      .populate('bands')
      .exec((err, posts) => {
        console.log('Populated User: ' + err);
      });
    if (!profile) {
      return res.status(400).json({ msg: 'There are no events for this user' });
    }

    res.json(profile);
  } catch (err) {
    res.status(500).send('Server error');
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

    const eventFields = {};
    const bandField = {};
    const cityField = {};
    const venueField = {};

    eventFields.bands = {};
    eventFields.user = req.user.id;

    if (headliner) {
      eventFields.bands.headliner = headliner;
      bandField.headliner = headliner;
    }
    if (openers) {
      eventFields.bands.openers = openers
        .split(',')
        .map(opener => opener.trim());
      bandField.openers = openers;
    }
    if (city) {
      eventFields.city = city;
      cityField.name = city;
    }
    if (venue) {
      eventFields.venue = venue;
      venueField.name = venue;
    }
    if (date) eventFields.date = date;

    // Insert logic for checking bands/venues/cities - perhaps filter()?
    // If they match an existing entry, do nothing, if they don't then create new one
    // *** Check logic ***
    // if (band match exists) { return null; }
    // else if (!band match exists) { const bandName = new Band({ *schema info* }) }
    //
    //
    // For every band added, iterate through array of existing bands
    // If entry exists, reference it and update its instances, venues, cities, etc.
    // If entry doesn't exist, create new one and set default/initial instances, venues, cities, etc.
    // Do the same for cities and venues

    // Do all of this in the events API instead, and then use findOne or insertOne or something to get that event data into the user profile?

    try {
      const newShow = new concert({
        bands: req.body.bands,
        date: req.body.date,
        city: req.body.city,
        venue: req.body.venue,
      });

      const newBand = new band({
        name: req.body.bands.headliner,
        instanceCount: 1,
      });

      const event = await newShow.save();
      const group = await newBand.save();

      let profile = await Profile.findOneAndUpdate(
        // Create Event document based on Schema, and query that instead?
        { user: req.user.id },
        { events: event, bands: group },
        { new: true, upsert: true }
      );
      res.json(profile);
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
