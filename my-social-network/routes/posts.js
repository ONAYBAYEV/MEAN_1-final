const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.post('/api/posts', postController.createPost);
router.get('/api/posts', postController.getPosts);


// Другие маршруты по необходимости.

module.exports = router;
