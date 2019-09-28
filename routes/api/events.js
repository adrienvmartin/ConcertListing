const express = require('express');
const Event = require('../../models/Event');
const Band = require('../../models/Band');
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const { SERVER_ERROR_MSG } = require('../../utils/constants');
const { check, validationResult } = require('express-validator/check');
const auth = require('../../middleware/auth');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const events = await Event.find({ user: req.user.id }).sort({ date: -1 });
    res.json(events);
  } catch (err) {
    res.status(500).send({ msg: SERVER_ERROR_MSG });
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    res.json(event);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Event not found' });
    }
    res.status(500).send(SERVER_ERROR_MSG);
  }
});

router.get('/bands', auth, async (req, res) => {
  try {
    const bands = await Band.find({ user: req.user.id });
    res.json(bands);
  } catch (err) {
    return res.status(500).send(SERVER_ERROR_MSG);
  }
});

router.post(
  '/',
  [
    auth,
    [
      check('bands', 'At least one band is required')
        .not()
        .isEmpty(),
      check('city', 'City is required')
        .not()
        .isEmpty(),
      check('venue', 'Venue is required')
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
      return res.status(400).json({ errors: errors.array() });
    }

    const { bands: { headliner, openers }, city, venue, date } = req.body;

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newEvent = new Event({
        bands: {
          headliner: req.body.bands.headliner,
          openers: req.body.bands.openers,
        },
        city: req.body.city,
        venue: req.body.venue,
        date: req.body.date,
      });

      const event = await newEvent.save();

      const bandList = [];
      bandList.push(headliner);
      bandList.push(openers.split(','.trim()));

      await bandList.forEach(b => { new Band({ name: b }).save(); });

      res.json(event);
    } catch (err) {
      console.error(err.message);
      res.status(500).send(SERVER_ERROR_MSG);
    }
  }
);

router.delete('/:event_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    const showIds = profile.events.map(events => events._id.toString());

    const removeIndex = showIds.indexOf(req.params.event_id);

    if (removeIndex === -1) {
      return res.status(500).json({ msg: SERVER_ERROR_MSG });
    } else {
      profile.events.splice(removeIndex, 1);
      await profile.save();
      return res.status(200).json(profile);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send(SERVER_ERROR_MSG);
  }
});

module.exports = router;
