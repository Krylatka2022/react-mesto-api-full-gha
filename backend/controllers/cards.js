// const mongoose = require('mongoose');
const { StatusCodes } = require('http-status-codes');
const Card = require('../models/card');
const BadRequestError = require('../errors/badRequest-error');
const NotFoundError = require('../errors/notFound-error');
const ForbiddenError = require('../errors/forbidden-error');

const getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.status(StatusCodes.OK).send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => card.populate('owner'))
    .then((card) => {
      res.status(StatusCodes.CREATED).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании карточки'));
      } else {
        next(err);
      }
    });
};

// Удаление карточки
function deleteCardById(req, res, next) {
  const { cardId } = req.params;
  Card.findById(cardId)
    .populate(['owner', 'likes'])
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена');
      }
      if (req.user._id !== card.owner._id.toString()) {
        throw new ForbiddenError('У вас нет прав на удаление данной карточки');
      }
      return Card.findByIdAndDelete(cardId);
    })
    .then(() => res.send({ message: 'Карточка удалена' }))
    .catch(next);
}

const likeCard = (req, res, next) => {
  const { cardId } = req.params;
  const { _id } = req.user;
  Card
    .findByIdAndUpdate(
      cardId,
      // req.params.cardId,
      { $addToSet: { likes: _id } },
      { new: true },
    )
    .populate(['owner', 'likes'])
    .orFail(() => new NotFoundError('Указанный _id не найден'))
    .then((card) => {
      if (!card) {
        return next(new NotFoundError('Карточка с указанным _id не найдена'));
      }
      // return res.send({ card, message: 'Лайк успешно поставлен' });
      return res.status(200).json(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные для постановки лайка'));
      } else {
        next(err);
      }
    });
};

const dislikeCard = (req, res, next) => {
  Card
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
    .populate(['owner', 'likes'])
    .orFail(() => new NotFoundError('Указанный _id не найден'))
    .then((card) => {
      if (!card) {
        return next(new NotFoundError('Карточка с указанным _id не найдена'));
      }
      // return res.send({ card, message: 'Лайк успешно удален' });
      return res.json(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные для снятия лайка'));
      } else {
        next(err);
      }
    });
};
// Экспорт модулей
module.exports = {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
};
