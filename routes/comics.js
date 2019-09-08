const express = require('express');
const comicsController = require('../controllers/comics');
const router = express.Router();

// GET /categories
router.get('/comics', comicsController.getComics);

// POST /category
router.post('/comic', comicsController.createComic);

router.get('/comic/:comicId',comicsController.getComic);


module.exports = router;