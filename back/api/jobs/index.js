const express = require('express');
const multer = require('multer');
const path = require('path');
const jobsCtrl = require('./jobs.ctrl');

const router = express.Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'public/img/');
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 1000 * 1024 * 1024 },
});

router.get('/', jobsCtrl.list);
router.get('/find/:companyName', jobsCtrl.search);
router.get('/tags', jobsCtrl.getTags);
router.get('/tags/:tagString', jobsCtrl.listByTags);
router.get('/:id', jobsCtrl.find);
router.post('/', jobsCtrl.write);
router.post('/upload', upload.single('img'), jobsCtrl.upload);
router.put('/like', jobsCtrl.like);
router.put('/unlike', jobsCtrl.unlike);
router.put('/addComment', jobsCtrl.addComment);
router.put('/replaceComment', jobsCtrl.replaceComment);
router.put('/:id', jobsCtrl.replace);
router.delete('/:id', jobsCtrl.delete);

module.exports = router;
