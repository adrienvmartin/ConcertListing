import { Request, Response } from 'express';
import { User } from '../../models/User';
import { IUserAuth } from '../../utils/interfaces';
import {
  SERVER_ERROR_MSG,
  EXISTING_USER_MSG,
  INVALID_CREDENTIALS_MSG
} from '../../utils/constants';

const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator/check');

router.get('/', auth, async (req: IUserAuth, res: Response) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).send(SERVER_ERROR_MSG);
  }
});

router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req: IUserAuth, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: INVALID_CREDENTIALS_MSG }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: INVALID_CREDENTIALS_MSG }] });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 3600 }, (err: string, token: string) => {
          if (err) { throw err; }
          res.json({ token });
        });

    } catch (err) {
      console.error(err.message);
      res.status(500).send(SERVER_ERROR_MSG);
    }
  }
);

module.exports = router;
