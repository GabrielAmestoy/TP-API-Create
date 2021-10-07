const express = require('express');
const router = express.Router();
const ApimoviesController = require('../../controllers/api/moviesController');

router.get('/movies', ApimoviesController.listmovies);
router.post('/movies', ApimoviesController.create);
router.get('/movies/:id', ApimoviesController.detail);
router.delete('/movies/:id', ApimoviesController.destroy);

module.exports = router;