const express = require('express');
const concert = require('../../models/Event');
const { SERVER_ERROR_MSG } = require('../../utils/constants');

const router = express.Router();

// Find example shows - will create hard-coded database for that
// Find way for user to add and delete shows without permanently affecting database
router.get('/', async (req, res) => {
  try {
    const examples = await concert.find({}).sort({ date: 1 });
    res.json(examples);
    console.log('examples: ' + examples);
  } catch (err) {
    res.status(500).send({ msg: SERVER_ERROR_MSG })
  }
});
