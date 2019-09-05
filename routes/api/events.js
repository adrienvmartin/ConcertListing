const express = require('express');
const Concert = require('../../models/Event');
const Profile = require('../../models/Profile');
const { SERVER_ERROR_MSG } = require('../../utils/constants');
const { check, validationResult } = require('express-validator/check');
const auth = require('../../middleware/auth');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const events = await Concert.find().toArray();
    res.json(events);
  } catch (err) {
    res.status(500).send({ msg: SERVER_ERROR_MSG });
  }
});

router.put(
  '/events',
  [
    auth,
    [
      check('bands', 'At least one band is required').not.isEmpty(),
      check('city', 'City is required').not.isEmpty(),
      check('venue', 'Venue is required').not.isEmpty(),
      check('date', 'Date is required').not.isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { bands, city, venue, date } = req.body;

    const newShow = {
      bands,
      city,
      venue,
      date,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.events.unshift(newShow);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send(SERVER_ERROR_MSG);
    }
  }
);

router.delete('/events/:event_id', auth, async (req, res) => {
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
