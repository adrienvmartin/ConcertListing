const jwt = require('jsonwebtoken');
const config = require('config');
import { Request, Response, NextFunction } from 'express';
import { IUserAuth } from '../utils/interfaces';
import { NO_TOKEN_MSG, INVALID_TOKEN_MSG } from '../utils/constants';

module.exports = (req: IUserAuth, res: Response, next: NextFunction) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: NO_TOKEN_MSG });
  }

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user;
    next();
  } catch (err) {
    return res.status(401).json({ msg: INVALID_TOKEN_MSG });
  }
};
