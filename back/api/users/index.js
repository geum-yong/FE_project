const express = require('express');
const usersCtrl = require('./users.ctrl');

const router = express.Router();

router.get('/:id', usersCtrl.find);
router.post('/', usersCtrl.write);
router.put('/like', usersCtrl.like);
router.put('/unlike', usersCtrl.unlike);

module.exports = router;
