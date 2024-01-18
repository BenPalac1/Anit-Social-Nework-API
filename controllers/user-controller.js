const { User } = require('../models');
const thoughtController = require('./thought-controller');

const userController = {
    //GET  all users
    async getAllUsers(req, res) {
        try {
            const user = await User.find({});
            res.json(user);

        } catch (err) {
            res.status(500).json(err);
        }
    },

    //GET a user by _id
    async getOneUser(req, res) {
        try {
            const user = await User.findOne({_id:req.params.userId});

            if (!user) {
                res.status(404).json({ message: 'User does not exist!'});
            } else {
                res.json(user)
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //create a new user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.status(201).json(user);
        } catch {
            res.status(500).json(err);
        }
    },

    //update user by _id
    async updateUser(req, res) {
        try {
            const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
                new: true,
            });

            if (!user) {
                res.status(404).json({ message: 'User does not exist!' });
            } else {
                res.json(user);
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },

     // delete a user
    async removeUser(req,res) {
        try {
            const user = await User.findByIdAndDelete({_id:req.params.userId});
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //add friend
    async addFriend(req, res) {
        try {
          const user = await User.findOneAndUpdate(
              {_id:req.params.userId},
              {$addToSet: {friends: req.body}},
              {runValidators: true, new: true}
          );
          user ? res.json(user) : res.status(404).json({message: 'Friend not found!'});
        } catch (e) {
          res.status(500).json(e);
        }
    },

    //DELETE a friends
    async removeFriend(req, res) {
        try {
          const user = await User.findOneAndUpdate(
              {_id: req.params.userId},
              {$pull: {friends: {friendId: req.params.friendId}}},
              {runValidators: true, new: true}
          );
  
          user ? res.json(user) : res.status(404).json({message: 'Friend not found!'});
        } catch (e) {
          res.status(500).json(e);
        }
    },
};

module.exports = thoughtController;
