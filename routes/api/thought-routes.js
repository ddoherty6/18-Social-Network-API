const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction
} = require('../../controllers/thought-controller');

// /api/thoughts/
router.route('/').get(getAllThoughts);

// /api/thoughts/:id
router
  .route('/:id')
  .get(getThoughtById)
  .post(createThought) // push created thought's _id to associated user's thoughts array field
  .put(updateThought)
  .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router
  .route('/:thoughtId/reactions')
  .put(createReaction)
  .delete(deleteReaction);

module.exports = router;
