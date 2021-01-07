const Counter = require('../models/counters');

const getNextSequence = async name => {
  try {
    const ret = await Counter.findOneAndUpdate({ _id: name }, { $inc: { seq: 1 } });
    return ret.seq;
  } catch (e) {
    console.error(e);
  }
};

module.exports = getNextSequence;
