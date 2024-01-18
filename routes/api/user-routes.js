const router = require('express').Router();

const {
    getAllUsers,
    getOneUser,
    createUser,
    updateUser,
    removeUser,
    addFriend,
    removeFriend,
} = require('../../controllers/user-controller');

// GET route to get all users and POST to create a new user
router.route('/').get(getAllUsers).post(createUser);

// GET route to get a single user by its `_id` and populated thought and friend data
//PUT route to update a user by its`_id`, and DELETE route to remove a user by its `_id`
router.route('/:userId').get(getOneUser).put(updateUser).delete(removeUser);

// POST route to add a new friend to a user's friends list
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;