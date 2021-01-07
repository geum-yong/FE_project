const express = require('express');

const router = express.Router();

const jobs = require('./jobs');
const users = require('./users');

router.use('/jobs', jobs);
router.use('/users', users);

module.exports = router;
