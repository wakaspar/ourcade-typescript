// Require Dependencies:
const db = require('../models'),
    passport = require('passport'),
    mongoose = require('mongoose'),
    User = db.User;

// USER : Route definitions
// Get all users:
function index(req, res) {
    User
    .find(function(err, user) {
        if (err) { console.log(err); }
        res.json(user);
    });
}
// Get one user by [:id]:
function show(req, res) {
    let id = mongoose.Types.ObjectId(req.params.id);
    User
    .findById(id, function(err, user) {
        if (err) { console.log(err) }
        res.json(user)
    })
}
// Add a new user:
function signup(req, res) {
    User
    .register(
        new User({ username: req.body.username, email: req.body.email }), req.body.password,
        function(err, newUser) {
            passport.authenticate('local')(req, res, function() {
                res.send(newUser);
            });
            err ? console.log('err: ', err) : null;
        }
    )
}
// Update one user by [:id]:
function update(req, res) {
    let id = mongoose.Types.ObjectId(req.params.id);
    User
    .findById(id, function(err, user) {
        if (!user)
            res.status(404).send('User not found: ', err);
        else
            user.name = req.body.name;
            user.email = req.body.email;
            user.save().then(user => {
                res.status(400).json('User updated successfully: ', user);
            })
            .catch(err => {
                res.status(400).send('Failed to update user - err: ', err);
            });
    });
}
// Delete one user by [:id]:
function destroy(req, res) {
    let id = mongoose.Types.ObjectId(req.params.id);
    User
    .findById(id, function(err, user) {
        if (err) { console.log('err: ', err) }
        user.delete()
        .then(user => {
            res.status(200).json({'User deleted: ': user});
        })
        .catch(err => {
            res.status(400).send('Failed to delete user: ', err);
        })
    });
}
// Export module methods:
module.exports = {
    index: index,
    show: show,
    signup: signup,
    update: update,
    destroy: destroy
}