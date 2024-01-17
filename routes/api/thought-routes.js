const router = require('express').Router();

const {
    getAllThoughts,
    getOneThought,
    createThought,
    updateThought,
    removeThought,
    createReaction,
    removeReaction,
} = require('../../controllers/thought-controller');

//GET route to get all thoughts and POST route to create a new thought
router.route('/').get(getAllThoughts).post(createThought);

//GET route to get a single thought by its `_id`, PUT to update a thought by its _id
// and DELETE route to remove a thought by its `_id`
router.route('/:thoughtId').get(getOneThought).put(updateThought).delete(removeThought);

//POST route to create a reaction stored in a single thought's `reactions` array field
router.route('/:thoughtId/reactions').post(createReaction);

//DELETE route to pull and remove a reaction by the reaction's `reactionId` value
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;
