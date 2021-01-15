'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ScoreSchema = new Schema({
    score_value: Number,
    score_game: String,
    score_multiplayer: Boolean,
    score_player_num: Number
});

module.exports = mongoose.model('Score', ScoreSchema);
