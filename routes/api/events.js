const express = require('express');
const Concert = require('../../models/Event');
const { SERVER_ERROR_MSG } = require('../../utils/constants');
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
