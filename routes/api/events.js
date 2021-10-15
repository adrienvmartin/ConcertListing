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

const getBandCounts = events => {
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

  return Object.keys(counts).map(key => ({
    name: key,
    instances: counts[key],
  }));
};

getOtherCounts = (events, param) => {
  const list = events.map(e => {
    return e[param];
  });

  const counts = {};

  for (let i = 0; i < list.length; i++) {
    counts[list[i]] = (counts[list[i]] || 0) + 1;
  }

  return Object.keys(counts).map(key => ({
    name: key,
    instances: counts[key],
  }));
};

router.get('/bands', auth, async (req, res) => {
  try {
    const events = await concert.find({ user: req.user.id });

    const result = getBandCounts(events);

    res.json(result);
  } catch (err) {
    res.status(500).send({ msg: SERVER_ERROR_MSG });
    console.error(err);
  }
});

router.get('/cities', auth, async (req, res) => {
  try {
    const events = await concert.find({ user: req.user.id });

    const result = getOtherCounts(events, 'city');

    res.json(result);
  } catch (err) {
    res.status(500).send({ msg: SERVER_ERROR_MSG });
    console.error(err);
  }
});

router.get('/venues', auth, async (req, res) => {
  try {
    const events = await concert.find({ user: req.user.id });

    const result = getOtherCounts(events, 'venue');

    res.json(result);
  } catch (err) {
    res.status(500).send({ msg: SERVER_ERROR_MSG });
    console.error(err);
  }
});

router.get('/stats', auth, async (req, res) => {
  try {
    const events = await concert.find({ user: req.user.id });
    const eventCount = events.length;
    const bands = getBandCounts(events).length;
    const cities = getOtherCounts(events, 'city').length;
    const venues = getOtherCounts(events, 'venue').length;

    const countObject = {
      eventCount,
      bands,
      cities,
      venues,
    };
    res.json(countObject);
  } catch (err) {
    res.status(500).send({ msg: SERVER_ERROR_MSG });
    console.error(err);
  }
});

// Create new event
router.post(
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

      // Use conditional logic to check if band already exists, if it doesn't then create
      // a new band through the Band model, if it does already exist then increment its instances
      // Same with venue and city?

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
