const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

const api = require('./api');

app.use(cors());
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

app.set('port', process.env.PORT || 80);

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

app.get('/', (req, res) => {
  res.send('test');
});

app.use('/api', api);

app.listen(app.get('port'), () => {
  console.log(`http://localhost:${app.get('port')}`);
});
