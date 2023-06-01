/* eslint-disable max-len */
const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/user');
const NotFoundError = require('../errors/notFound-error');
const BadRequestError = require('../errors/badRequest-error');
const ConflictError = require('../errors/conflict-error');

const { NODE_ENV, JWT_SECRET } = process.env;
const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(StatusCodes.OK).send(users))
    .catch(next);
};

function findUserById(userId, res, next) {
  User.findById(userId)
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден');
    })
    .then((user) => res.status(200).send(user))
    .catch(next);
}

function getUserMe(req, res, next) {
  findUserById(req.user._id, res, next);
}

function checkUser(req, res, next) {
  const { userId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new BadRequestError('Переданы некорректные данные при поиске пользователя');
  }
  findUserById(userId, res, next);
}

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email,
  } = req.body;

  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      User
        .create({
          name, about, avatar, email, password: hash,
        })
        .then((user) => res.status(StatusCodes.CREATED).send(user))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new BadRequestError('Переданы некорректные данные при создании пользователя '));
          } else if (err.code === 11000) {
            next(new ConflictError('Пользователь с таким email уже зарегистрирован'));
          } else {
            next(err);
          }
        });
    })
    .catch(next);
};

function updateUserFields(req, res, next, updateFunction) {
  const { name, about, avatar } = req.body;
  updateFunction(req.user._id, { name, about, avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному _id не найден');
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при обновлении профиля'));
      } else {
        next(err);
      }
    });
}

function updateUser(req, res, next) {
  updateUserFields(req, res, next, User.findByIdAndUpdate);
}

function updateAvatar(req, res, next) {
  updateUserFields(req, res, next, User.findByIdAndUpdate);
}

const login = (req, res, next) => {
  const { email, password } = req.body;
  User
    .findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      // const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key', { expiresIn: '7d' });

      // Рабочий код
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: 'none',
          secure: true,
          // sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'Lax',
          // secure: process.env.NODE_ENV === 'production',
        })
        // .send({ token });
        .send(user.toJSON());
    })
    .catch(next);
};

// Экспорт модулей
module.exports = {
  getUsers,
  createUser,
  updateAvatar,
  updateUser,
  login,
  getUserMe,
  checkUser,
};
