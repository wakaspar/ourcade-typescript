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
        if (err) console.log(err);
        res.json(user);
    });
}
// Get one user by [:id]:
function show(req, res) {
    let id = mongoose.Types.ObjectId(req.params.id);
    User
    .findById(id, function(err, user) {
        if (err) console.log(err);
        res.json(user)
    })
}
// Add a new user:
function create(req, res) {
    User
    .register(
        new User({ username: req.body.username, email: req.body.email, avatar: null }), req.body.password,
        function(err, newUser) {
            passport.authenticate('local')(req, res, function() {
                res.send(newUser);
            });
            err ? console.log('err: ', err) : null;
        }
    )
}

// PUT - Update one user by [:id]:
function update(req, res, next) {
    console.log('BEFORE UPDATE - REQ.BODY: ', req.body);
    console.log('BEFORE UPDATE - REQ.FILE: ', req.file);
    let id = mongoose.Types.ObjectId(req.params.id);
    User
    .findById(id, function(err, user) {
        if (!user)
            res.status(404).send(err);
        else
            user.username = req.body.username;
            user.email = req.body.email;
            user.avatar = req.body.avatar;
            user.save().then(user => {
                res.status(400).json(user);
            })
            .catch(err => {
                res.status(400).send(err);
                err ? console.log('err: ', err) : null;
            });
    });
}
// POST - Same as update:
function avatar(req, res, next) {
    console.log('BEFORE AVATAR - REQ.BODY: ', req.body);
    console.log('BEFORE AVATAR - REQ.FILE: ', req.file);
    let id = mongoose.Types.ObjectId(req.params.id);
    User
    .findById(id, function(err, user) {
        if (!user)
            res.status(404).send(err)
        else
            user.username = req.body.username;
            user.email = req.body.email;
            user.avatar = req.body.avatar;
            user.save().then(user => {
                res.status(400).json(user);
            })
            .catch(err => {
                res.status(400).send(err);
                err ? console.log('err: ', err) : null;
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
            res.status(400).send(err);
        })
    });
}
// Export module methods:
module.exports = {
    index: index,
    show: show,
    create: create,
    update: update,
    destroy: destroy,
    avatar: avatar,
}