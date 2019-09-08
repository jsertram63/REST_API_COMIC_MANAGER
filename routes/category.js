const express = require('express');
const categoryController = require('../controllers/category');
const router = express.Router();

// GET /category
router.get('/categories', categoryController.getCategories);

// POST /category
router.post('/category', categoryController.createCategory);


module.exports = router;