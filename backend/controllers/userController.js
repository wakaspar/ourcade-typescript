const db = require('../models');

// USER : Route definitions
// Get all users
function index(req, res) {
    db.User.find(function(err, scores) {
        if (err) {
            console.log(err);
        } else {
            res.json(scores);
        }
    });
}

// Get one user by :id
function show(req, res) {
    let id = req.params.id;
    db.User.findById(id, function(err, score) {
        res.json(score);
    });
}

// Add a new user
// function create(req, res) {
//     let user = new db.User(req.body);
//     user.save()
//         .then(score => {
//             res.status(200).json({'user added: ': user});
//         })
//         .catch(err => {
//             res.status(400).send('failed to add new user');
//         });
// }

// Update one user by :id
function update(req, res) {
    db.User.findById(req.params.id, function(err, user) {
        if (!user)
            res.status(404).send('data is not found');
        else
            user.username = req.body.username;
            user.password = req.body.password;

            user.save().then(user => {
                res.json('User updated!');
            })
            .catch(err => {
                res.status(400).send('failed to update user');
            });
    });
}

// Delete one user by :id
function destroy(req, res) {
    db.User.findById(req.params.id, function(err, user) {
        user.delete()
            .then(user => {
                res.status(200).json({'user deleted: ': user});
            })
            .catch(err => {
                res.status(400).send('failed to delete user');
            })
      });
}

// Export module methods
module.exports = {
    index: index,
    show: show,
    // create: create,
    update: update,
    destroy: destroy
  }