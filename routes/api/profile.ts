import { Request, Response } from 'express';
import { SERVER_ERROR_MSG, NO_PROFILE_MSG } from '../../utils/constants';
import { IUserAuth } from '../../utils/interfaces';
import { Profile } from '../../models/Profile';
import { User } from '../../models/User';

const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

router.get('/me', auth, async (req: IUserAuth, res: Response) => {
  try {
    let profile = await Profile.findOne({ user: req.user.id }).populate('user',
      ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: NO_PROFILE_MSG });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send(SERVER_ERROR_MSG);
  }

});

module.exports = router;
