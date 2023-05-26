require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const routes = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');
const { createUser, login } = require('./controllers/users');
const { validationSignIn, validationSignUp } = require('./middlewares/validation');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

app.use(cors());
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 100, // можно совершить максимум 100 запросов с одного IP
});
// подключаемся к серверу mongo
mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
  //   // suseUnifiedTopology: true,
});

app.use(express.json());
app.use(cookieParser());
// const { PORT = 3000, DB_ADRESS } = process.env;
const { PORT = 3000 } = process.env;

// mongoose.connect(DB_ADRESS);
// подключаем мидлвары, роуты и всё остальное...
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', validationSignUp, createUser);
app.post('/signin', validationSignIn, login);

app.use(limiter);
// app.use(auth);

app.use(routes);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`app слушает порт: ${PORT}`);
});
