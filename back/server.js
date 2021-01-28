const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const morgan = require('morgan');
const hpp = require('hpp');
const helmet = require('helmet');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

const api = require('./api');

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
require('dotenv').config();

mongoose
  .connect(process.env.MONGO_URI, {
    dbName: 'FE',
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(e => {
    console.log(e);
  });

app.set('port', process.env.PORT || 3060);

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
  app.use(hpp());
  app.use(helmet());
} else {
  app.use(morgan('dev'));
}

app.use(cookieParser(process.env.COKKIE_ID));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_ID,
    cookie: {
      httpOnly: true,
    },
  })
);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', api);

app.listen(app.get('port'), () => {
  console.log(`http://localhost:${app.get('port')}`);
});
