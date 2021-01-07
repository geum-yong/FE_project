const mongoose = require('mongoose');

const { Schema } = mongoose;

const CounterSchema = new Schema({
  _id: String,
  seq: Number,
});

const Counter = mongoose.model('Counter', CounterSchema);

module.exports = Counter;
