const res = require('express/lib/response');
const { User, Thought } = require('../models');

const userController = {

    getUsers(req, res) {
        User.find()
        .select('-__v')
        .then((dbUserData) => {
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },


    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId})
        .select('-_v')
        .populate('friends')
        .populate('thoughts')
        .then((dbUserData) => {
            if (!dbUserData) {
                return res.status(404).json({message: 'User with this ID does not exist!'}) ;
            } res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    createUser(req, res) {
        User.create(req.body)
        .then((dbUserData) => {
            res.json(dbUserData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },


    updateUser(req,res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            {
                $set: req.body,
            },
            {
                runValidators: true,
                new: true,
            }
        )
        .then((dbUserData) => {
            if (!dbUserData) {
              return res.status(404).json({ message: 'User with this ID does not exist.' });
            }
            res.json(dbUserData);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      }
};

deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((dbUserData) => { 
          if (!dbUserData) {
        return res.status(404).json({ message: 'No user with this id!' });
    };
      })
        
};


addFriend(req,res) {
    User.findOneAndUpdate({ id: req.params.userId}, {$addToSet: { friends: req.params.id.friendId} }, {new: true})
    .then((dbUserData) => {
        if(!dbUserData) {
            return res.status(404).json({ message: 'User does not exist!'});
        }
        res.json(dbUserData);
    })
    .catch((err) => {
    console.log(err)
    res.status(500).json(err);
    })

};

    removeFriend(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { new: true })
          .then((dbUserData) => {
            if (!dbUserData) {
              return res.status(404).json({ message: 'User with this ID does not exist.' });
            }
            res.json(dbUserData);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      };


module.exports = userController;