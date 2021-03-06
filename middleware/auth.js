const jwt = require('jsonwebtoken');
const config = require('config');
const { NO_TOKEN_MSG, INVALID_TOKEN_MSG } = require('../utils/constants');

module.exports = (req, res, next) => {
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
