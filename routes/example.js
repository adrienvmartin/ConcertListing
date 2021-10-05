const express = require('express');
const concert = require('../../models/Event');
const { SERVER_ERROR_MSG } = require('../utils/constants');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const exampleshows = await concert.find({ user: examples }).sort({ date: 1 });
    res.json(exampleshows);
  } catch (err) {
    res.status(500).send({ msg: SERVER_ERROR_MSG })
  }
})