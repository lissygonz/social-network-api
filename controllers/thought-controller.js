const { Thought, User} = require('../models');

const thoughtController = {


    //gets all thoughts
    getThoughts(req,res) {
        Thought.find()
        .sort({ createdAt: -1})
        .then((dbThoughtData) => {
            res.json(dbThoughtData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    //gets a single thought by its ID
    getSingleThought(req, res) {
        Thought.fineOne({ id: req.params.thoughtId})
        .then((dbThoughtData) => {
        if (!dbThoughtData) {
            return res.status(404).json({ message: 'Thought with this ID does not exist. '});
        }
        res.json(dbThoughtData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    //creates a new though
    createThought(req, res) {
        Thought.create(req.body)
          .then((dbThoughtData) => {
            return User.findOneAndUpdate(
              { _id: req.body.userId },
              { $push: { thoughts: dbThoughtData._id } },
              { new: true }
            );
          })
          .then((dbUserData) => {
            if (!dbUserData) {
              return res.status(404).json({ message: 'There is no user to this thought!' });
            }
    
            res.json({ message: 'Thought has been created!' });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },

      //udpates thought

      updateThought(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { runValidators: true, new: true })
          .then((dbThoughtData) => {
            if (!dbThoughtData) {
              return res.status(404).json({ message: 'Thought with this ID does not exist.' });
            }
            res.json(dbThoughtData);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      }

      //add reaction 
      addReaction(req,res) {
          Thought.findOneAndUpdate(
              { _id: req.params.thoughtId},
              { $addToSet: { reactions: req.body} },
              {runValidators:true, new: true}

          )

          .then((dbThoughtData) => {
              if (!dbThoughtData) {
                  return res.status(404).json({ message: 'User does not exist'});
              }
              res.json(dbThoughtData);
          })

          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },

      //removes the reaction
      removeReaction(req, res) {
          Thought.findOneAndUpdate(
              {_id: req.params.thoughtId},
              { $pull : { reactions: { reactionId: req.params.reactionId } } },
              {runValidators: true, new:true}
          )

          .then((dbThoughtData) => {
            if (!dbThoughtData) {
              return res.status(404).json({ message: 'Thought with this ID does not exist.' });
            }
            res.json(dbThoughtData);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
      };

      module.exports = thoughtController;

