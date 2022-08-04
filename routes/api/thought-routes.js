const router = require('expresss').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    addReaction,
    removeReaction,
    getSingleThought,
} = require('../../controllers/thought-controller');

//thoughts
router.route('/').get(getThoughts).post(createThought);

//update thoughts
router.route(':/thoughtId').get(getSingleThought).put(updateThought);

// add reaction
router.route(':/thoughtId/reactions').post(addReaction);

//remove reaction
router.route('/:thoughtId,reactions,:reactionId').delete(removeReaction);

module.exports = router;