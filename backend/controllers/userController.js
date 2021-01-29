// Require Dependencies:
const db = require('../models'),
    passport = require('passport');

// Get all users:
function index(req, res) {
    db.User.find(function(err, user) {
        if (err) {
            console.log(err);
        } else {
            res.json(user);
        }
    });
}
// Get one user by [:id]:
function show(req, res) {
    let id = req.params.id;
    db.User.findById(id, function(err, user) {
        res.json(user);
    });
}
// Add a new user:
function signup(req, res) {
    console.log('inside api/signup!');
    console.log(`${req.body.username}, ${req.body.password}`);
    db.User.register(
        new db.User({ username: req.body.username }), req.body.password,
        function(err, newUser){
            passport.authenticate('local')(req, res, function(){
                res.send(newUser);
            });
            err ? console.log('err: ', err) : null;
        }
    )
}
// Update one user by [:id]:
function update(req, res) {
    console.log('BEFORE RESPONSE - UPDATE, req.body: ', req.body);
    db.User.findById(req.params.id, function(err, user) {
        if (!user)
            res.status(404).send('user is not found');
        else
            user.username = req.body.username;

            user.save().then(user => {
                res.json('User updated!');
            })
            .catch(err => {
                res.status(400).send('failed to update user - err: ', err);
            });
    });
}
// Delete one user by [:id]:
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
// Export module methods:
module.exports = {
    index: index,
    show: show,
    signup: signup,
    update: update,
    destroy: destroy
}