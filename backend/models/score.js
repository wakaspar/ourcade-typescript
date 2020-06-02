'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ScoreSchema = new Schema({
    score_value: String,
    score_game: String,
    score_multiplayer: Boolean,
    score_player_num: String
});

module.exports = mongoose.model('Score', ScoreSchema);
