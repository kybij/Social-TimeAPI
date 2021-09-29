const { User } = require('../models');

const UserController = {

  // Get user
  getAllUsers(req, res) {
    User.find({})
      .then(dbUser => {
        res.json(dbUser);
      })
      .catch(err => {
        res.json(err);
      });
  },



  
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
    .populate({
        path: 'thoughts',
        select: '-__v'
    })
    .populate({
        path: 'friends',
        select: '-__v'
    })
    .select('-__v')
      .then((dbUser) => {
        if(!dbUser) {
          res.status(404).json({ message: "No User found with this Id" });
          return
        }
        res.json(dbUser);
      })
      .catch((err) => {
        res.json(err);
      })
  },

  

  createUser({ body }, res) {
    User.create(body)
      .then(dbUser => {
        res.json(dbUser);
      })
      .catch(err => {
        res.json(err);
      });
  },



 
  updateUserById({ params, body }, res) {
    User.findOneAndUpdate(
      { _id: params.id},
      body,
      { new: true, runValidator: true }
    )
      .then((dbUser) => {
        if (!dbUser) {
          res.status(404).json({ message: "No User found with this Id" });
          return
        }
        res.json(dbUser);
      })
      .catch((err) => {
        res.json(err);
      });
  },

 

  deleteUserById({ params }, res) {
    User.findByIdAndDelete({_id: params.id})
    .then((dbUser) => {
      if (!dbUser) {
        res.status(404).json({ message: "No User found with this Id" });
        return
      }
      res.json(dbUser);
    })
    .catch((err) => {
      res.json(err);
    });
  },

    


  addFriend({ params }, res) {
    User.findOneAndUpdate(
        { _id: params.id },
        { $push: { friends: params.friendId }},
        { new: true, runValidators: true }
    )
    .populate({
        path: 'friends',
        select: ('-__v')
    })
    .select('-__v')
    .then(dbUser => {
        if (!dbUser) {
            res.status(404).json({ message: 'No User found with this Id' });
            return
      }
      res.json(dbUser);
    })
    .catch((err) => {
      res.json(err);
    });
  },

  
  
  deleteFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      { $pull: { friends: params.friendId }},
      { new: true, runValidators: true }
  )
  .populate({
      path: 'friends',
      select: ('-__v')
  })
  .select('-__v')
  .then(dbUser => {
      if (!dbUser) {
          res.status(404).json({ message: 'No User found with this Id' });
          return
    }
    res.json(dbUser);
  })
  .catch((err) => {
    res.json(err);
  });
},



}



module.exports = UserController;
