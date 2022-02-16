const jwt = require('jsonwebtoken');
require('dotenv').config();

const API_SECRET = process.env.JWT_SECRET;

const JWT_CONFIG = {
  expiresIn: '60m',
  algorithm: 'HS256',
};

const createToken = (data) => jwt.sign({ data }, API_SECRET, JWT_CONFIG);

const verifyToken = (token, next) => {
  try { 
    const decoded = jwt.verify(token, API_SECRET);
  return decoded;
} catch (err) {
  err.code = 401;
  console.log(err.message);
  return next(err);
}
};

const checkToken = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ message: 'Token not found' });
  if (authorization.length < 15) {
    return res.status(401).json({
    message: 'Expired or invalid token',
  });
}
  const user = await verifyToken(authorization, next);
  req.user = user;

  next();
};

module.exports = {
  createToken,
  verifyToken,
  checkToken,
}; 
