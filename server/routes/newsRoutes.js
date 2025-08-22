const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');

router.get('/newsgrabber', newsController.getNews);

module.exports = { router };