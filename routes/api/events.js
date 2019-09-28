const express = require('express');
const concert = require('../../models/Event');
const { SERVER_ERROR_MSG } = require('../../utils/constants');
const { check, validationResult } = require('express-validator/check');
const auth = require('../../middleware/auth');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const events = await concert.find({ user: req.user.id }).sort({ date: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).send({ msg: SERVER_ERROR_MSG });
  }
});

router.get('/bands', auth, async (req, res) => {
  try {
    const events = await concert.find({ user: req.user.id });
    const openersList = events.map(e => {
      return e.bands.openers[0].split(',').map(o => o.trim());
    });
    const headlinersList = events.map(e => {
      return e.bands.headliner;
    });
    const bandList = [].concat.apply(headlinersList, openersList).sort();

    const counts = {};

    for (let i = 0; i < bandList.length; i++) {
      counts[bandList[i]] = (counts[bandList[i]] || 0) + 1;
    }

    const result = Object.keys(counts).map(key => ({
      name: key,
      instances: counts[key],
    }));

    res.json(result);
  } catch (err) {
    res.status(500).send({ msg: SERVER_ERROR_MSG });
    console.error(err);
  }
});

router.get('/cities', auth, async (req, res) => {
  try {
    const events = await concert.find({ user: req.user.id });
    const cityList = events.map(e => {
      return e.city;
    });

    const counts = {};

    for (let i = 0; i < cityList.length; i++) {
      counts[cityList[i]] = (counts[cityList[i]] || 0) + 1;
    }

    const result = Object.keys(counts).map(key => ({
      name: key,
      instances: counts[key],
    }));

    res.json(result);
  } catch (err) {
    res.status(500).send({ msg: SERVER_ERROR_MSG });
    console.error(err);
  }
});

router.get('/venues', auth, async (req, res) => {
  try {
    const events = await concert.find({ user: req.user.id });
    const venueList = events.map(e => {
      return e.venue;
    });

    const counts = {};

    for (let i = 0; i < venueList.length; i++) {
      counts[venueList[i]] = (counts[venueList[i]] || 0) + 1;
    }

    const result = Object.keys(counts).map(key => ({
      name: key,
      instances: counts[key],
    }));

    res.json(result);
  } catch (err) {
    res.status(500).send({ msg: SERVER_ERROR_MSG });
    console.error(err);
  }
});

// Create new event
router.put(
  '/',
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
router.delete('/:id', auth, async (req, res) => {
  try {
    const foundEvent = await concert.findById(req.params.id);

    if (!foundEvent) {
      return res.status(404).json({ msg: 'Event not found' });
    }

    if (foundEvent.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await foundEvent.remove();

    res.json({ msg: 'Event removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Event not found' });
    }

    res.status(500).send({ msg: SERVER_ERROR_MSG });
  }
});

module.exports = router;
