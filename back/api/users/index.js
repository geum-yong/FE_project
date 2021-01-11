const express = require('express');
const jobsCtrl = require('./users.ctrl');

const router = express.Router();

router.get('/:id', jobsCtrl.find);
router.post('/', jobsCtrl.write);
router.put('/like', jobsCtrl.like);
router.put('/unlike', jobsCtrl.unlike);

module.exports = router;
