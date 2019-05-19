import { Request, Response } from 'express';
import {
  SERVER_ERROR_MSG,
  NO_PROFILE_MSG,
  STATUS_REQUIRED_MSG,
} from '../../utils/constants';
import { Profile } from '../../models/Profile';
import { User, IUserAuth } from '../../models/User';

const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator/check');

router.get('/me', auth, async (req: IUserAuth, res: Response) => {
  try {
    let profile = await Profile.findOne({ user: req.user.id }).populate(
      'user',
      ['name', 'avatar']
    );

    if (!profile) {
      return res.status(400).json({ msg: NO_PROFILE_MSG });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send(SERVER_ERROR_MSG);
  }
});

router.post('/', auth, async (req: IUserAuth, res: Response) => {
  try {
    let profile = Profile.findOne({ user: req.user.id });
    res.json(profile);
  } catch (err) {
    res.status(500).send(SERVER_ERROR_MSG);
  }
});

router.get('/', async (req: Request, res: Response) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(SERVER_ERROR_MSG);
  }
});

module.exports = router;
