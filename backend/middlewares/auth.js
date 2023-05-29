const jwt = require('jsonwebtoken');
// const { StatusCodes } = require('http-status-codes');
const AuthError = require('../errors/auth-error');

const { NODE_ENV, JWT_SECRET } = process.env;

const handleUnauthorized = (req, res, next) => next(new AuthError('Необходима авторизация'));

// res.status(StatusCodes.UNAUTHORIZED).send({ message: 'Необходима авторизация' });

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  // - рабочий код!!
  // const { authorization } = req.headers;
  // if (!authorization.startsWith('Bearer ')) {
  //   return handleUnauthorized(req, res, next);
  // }
  // const token = authorization.split('Bearer ')[1];
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
    // payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key');
  } catch (err) {
    return handleUnauthorized(req, res, next);
  }
  req.user = payload;
  return next();
};

module.exports = auth;
