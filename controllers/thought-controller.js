const { Thought } = require('../models');

const thoughtController = {
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find({});
      res.json(thoughts);

    } catch (err) {
      res.status(500).json(err);
    }
  },

  // handler to GET thought by _id 
  async getOneThought(req, res) {
    try {
      const thought = await Thought.findOne({_id:req.params.thoughtId});

      if (!thought) {
        res.status(404).json({ message: 'Thought does not exist!' });
      } else {
        res.json(thought);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // create a new thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      res.status(201).json(thought); // 201 created status code
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  // delete a thought
  async removeThought(req,res) {
    try {
        const thought = await Thought.findByIdAndDelete({_id:req.params.thoughtId});
        res.status(200).json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
  },

  // update a thought by it's `_id`
  async updateThought(req, res) {
    try {
      const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, {
        new: true,
      });

      if (!thought) {
        res.status(404).json({ message: 'Thought does not exist!' });
      } else {
        res.json(thought);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // create a reaction
  async createReaction(req, res) {
      try {
        const thought = await Thought.findOneAndUpdate(
            {_id:req.params.thoughtId},
            {$addToSet: {reactions: req.body}},
            {runValidators: true, new: true}
        );
        thought ? res.json(thought) : res.status(404).json({message: 'Reaction not found!'});
    } catch (e) {//catch exception
        res.status(500).json(e);
    }
  },

// DELETE reaction 
  async removeReaction(req, res) {
      try {
        const thought = await Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$pull: {reactions: {reactionId: req.params.reactionId}}},
            {runValidators: true, new: true}
        );

        thought ? res.json(thought) : res.status(404).json({message: 'Thought not found!'});
    } catch (e) {
        res.status(500).json(e);
    }
  },
};

module.exports = thoughtController;