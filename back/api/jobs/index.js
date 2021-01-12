const express = require('express');
const jobsCtrl = require('./jobs.ctrl');

const router = express.Router();

router.get('/', jobsCtrl.list);
router.get('/find/:companyName', jobsCtrl.search);
router.get('/tags', jobsCtrl.getTags);
router.get('/tags/:tagString', jobsCtrl.listByTags);
router.get('/:id', jobsCtrl.find);
router.post('/', jobsCtrl.write);
router.put('/like', jobsCtrl.like);
router.put('/unlike', jobsCtrl.unlike);
router.put('/addComment', jobsCtrl.addComment);
router.put('/replaceComment', jobsCtrl.replaceComment);
router.put('/:id', jobsCtrl.replace);
router.delete('/:id', jobsCtrl.delete);

module.exports = router;
