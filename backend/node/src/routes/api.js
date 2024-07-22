const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const podcastController = require('../controllers/podcastController');
const auth = require('../middleware/auth');

// Auth routes
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
// Favorite route
router.post('/podcasts/:id/favorite', auth, userController.toggleFavorite);

// Podcast routes
router.get('/podcasts', podcastController.getAllPodcasts);
router.get('/podcasts/:id', podcastController.getPodcastById);
router.get('/podcasts/search', podcastController.searchPodcasts);

module.exports = router;