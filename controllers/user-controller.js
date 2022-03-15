const { User, Thought } = require('../models');


const userController = {
  // get all users
  getAllUsers(req, res) {
    User.find({})
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // get one user by id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // createUser
  createUser({ body }, res) {
    User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  },

  // update user by id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found???? :(' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

  // delete user //// BONUS - UPON DELETE USER, FIND AND DELETE USER'S ASSOCATED THOUGHTS
  deleteUser({ params }, res) {
    
    User.findOneAndDelete({ _id: params.id })
    .then(dbUserData => {
      // find and delete thoughts associated with user's userId
      Thought.deleteMany(
        {
          userId: dbUserData._id
        }
      )
      .then(deletedCount => {
        res.json(Object.assign(dbUserData, deletedCount));
      });
    })
    .catch(err => res.json(err));

  },

  //// FRIENDS ////////////

  addFriend({ params }, res) {

    User.find({ _id: [params.userId, params.friendId] })
      .then(dbUserData => {
        //  dbUserData[1] is user, dbUserData[0] is friend
        // check that friend is not already added
        for (let i = 0; i < dbUserData[1].friends.length; i++) {
          if (dbUserData[1].friends[i]._id == params.friendId) {
            res.status(400).json({ message: "Friend already added" });
            return;
          }
        }
        // add friend
        dbUserData[1].friends.push(dbUserData[0]);
        dbUserData[1].save();
        res.json(dbUserData[1]);
      })
      .catch(err => res.json(err));
  },

  removeFriend({ params }, res){
    User.findOne({ _id: params.userId })
      .then(dbUserData => {
        if (!dbUserData) { //check if user exists
          res.status(404).json({ message: 'No user found' });
          return;
        }
        //check that friend is there for removal
        for (let i = 0; i < dbUserData.friends.length; i++) {
          if (dbUserData.friends[i]._id == params.friendId) {
            dbUserData.friends.splice(i, 1);
            dbUserData.save();
            res.json(dbUserData);
            return;
          }
        }
        
        res.status(400).json({ message: "User does not have this friend"});
      })
      .catch(err => res.json(err));
  }
};

module.exports = userController;
