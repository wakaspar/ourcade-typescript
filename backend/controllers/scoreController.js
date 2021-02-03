const db = require('../models');

// SCORE : Route definitions
// Get all scores
function index(req, res) {
    db.Score.find(function(err, scores) {
        if (err) {
            console.log(err);
        } else {
            res.json(scores);
        }
    });
}
// Get all scores for a single user
function userIndex(req, res) {
    let id = req.params.id;
    db.Score.find( { score_player: id }, function(err, scores) {
        if (err) {
            console.log(err);
        } else {
            res.json(scores);
        }
    });
}
// Get one score by :id
function show(req, res) {
    let id = req.params.id;
    db.Score.findById(id, function(err, score) {
        res.json(score);
    });
}
// Add a new score
function create(req, res) {
    console.log('BEFORE RESPONSE - CREATE, req.body: ', req.body);
    let score = new db.Score(req.body);
    score.save()
        .then(score => {
            res.status(200).json({'score added: ': score});
        })
        .catch(err => {
            res.status(400).send('failed to add new score');
        });
}
// Update one score by :id
function update(req, res) {
    console.log('BEFORE RESPONSE - UPDATE, req.body: ', req.body);
    db.Score.findById(req.params.id, function(err, score) {
        if (!score)
            res.status(404).send('data is not found');
        else
            score.score_value = req.body.score_value;
            score.score_game = req.body.score_game;
            score.score_multiplayer = req.body.score_multiplayer;
            score.score_player_num = req.body.score_player_num;

            score.save().then(score => {
                res.json('Score updated!');
            })
            .catch(err => {
                res.status(400).send('failed to update score - err: ', err);
            });
    });
}
// Delete one score by :id
function destroy(req, res) {
    db.Score.findById(req.params.id, function(err, score) {
        score.delete()
            .then(score => {
                res.status(200).json({'score deleted: ': score});
            })
            .catch(err => {
                res.status(400).send('failed to delete score - err: ', err);
            })
      });
}
// Export module methods
module.exports = {
    index: index,
    userIndex: userIndex,
    show: show,
    create: create,
    update: update,
    destroy: destroy
  }