const { User } = require('../models');

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

  // delete user // BONUS REMOVE A USER'S THOUGHTS UPON DELETE
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  },

  //// FRIENDS ////////////

  addFriend({ params }, res) {

    User.find({ _id: [params.userId, params.friendId] })
      .then(dbUserData => {
        dbUserData[0].friends.push(dbUserData[1]);
        dbUserData[0].save();
        res.json(dbUserData[0]);
      });
    //check if user exists
    // if (!dbUserData) {
    //   res.status(404).json({ message: 'No user found???? :(' });
    //   return;
    // }
    // //check that friend is not already added
    // for (let i = 0; i < dbUserData.friends.length; i++) {
    //   if (dbUserData.friends[i] === params.friendId) {
    //     res.status(400).json({ message: "Friend already added" });
    //     return;
    //   }
    // }
    // // add friendId to user's friends array
    // dbUserData.friends.push(params.friendId);
    // add new info to database
  },

  removeFriend({ params }, res){
    User.findOne({ _id: params.userId })
      .then(dbUserData => {
        if (!dbUserData) { //check if user exists
          res.status(404).json({ message: 'No user found???? :(' });
          return;
        }

        for (let i = 0; i < dbUserData.friends.length; i++) { //check that friend is not already added
          if (dbUserData.friends[i] === params.friendId) {
            dbUserData.friends.splice(i, 1);
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
