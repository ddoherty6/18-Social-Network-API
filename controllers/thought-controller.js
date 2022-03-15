const { Thought, User } = require('../models');

const thoughtController = {
  //get all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .then(dbThoughts => res.json(dbThoughts))
      .catch(err => res.sendStatus(500));
  },

  // get one thought
  getThoughtById({ params }, res){
    Thought.findById({_id: params.id})
    .then(dbThought => res.json(dbThought))
    .catch(err => res.json(err));
  },

  // add thought to user - 
  createThought({ params, body }, res) {
    Thought.create(body) // create thought
      .then(({ _id }) => {
        return User.findOneAndUpdate( // add thought to user
          { _id: params.id },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then(dbUserData => { // return updated user data to client
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found!!!!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

  //update thought
  //params.id is thought _id ; body contains new thoughtText
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
    .then(dbThought => res.json(dbThought))
    .catch(err => res.json(err));
  },
  
  // delete thought
  // params.id is thought _id
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then(deletedThought => {
        if (!deletedThought) {
          return res.status(404).json({ message: 'No thought found to delete' });
        }

        res.json(deletedThought);
      })
      .catch(err => res.json(err));
  },


  /////
  ////////// REACTIONS ///////////
  /////


  // add reaction to thought
  // params.thoughtId is thought _id, body is new or existing reaction
  createReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then(dbThought => res.json(dbThought))
      .catch(err => res.json(err));
  },
  // delete reaction
  deleteReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: body.reactionId } } },
      { new: true }
    )
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  }
};

module.exports = thoughtController;
