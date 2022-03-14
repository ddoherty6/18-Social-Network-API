const { Thought, User } = require('../models');

const thoughtController = {
  //get all thoughts
  getAllThoughts() {
    Thought.find({})
      .then(dbThoughts => res.json(dbThoughts))
      .catch(err => res.sendStatus(500));
  },
  // get one thought
  getThoughtById(){},
  // add thought to user
  createThought({ params, body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { comments: _id } },
          { new: true }
        );
      })
      .then(dbUserData => {
        console.log(dbUserData);
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found!!!!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },
  //update thought
  updateThought(){},
  // delete thought
  deleteThought({ params }, res) {
    Comment.findOneAndDelete({ _id: params.commentId })
      .then(deletedThought => {
        if (!deletedThought) {
          return res.status(404).json({ message: 'No thought' });
        }
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $pull: { comments: params.thoughtId } },
          { new: true }
        );
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },


  /////
  ////////// REACTIONS ///////////
  /////


  // add reaction to thought
  createReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { replies: body } },
      { new: true, runValidators: true }
    )
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },
  // delete reaction
  deleteReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { replies: { replyId: params.replyId } } },
      { new: true }
    )
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  }
};

module.exports = thoughtController;
