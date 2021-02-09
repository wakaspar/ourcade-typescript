'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ScoreSchema = new Schema({
    _player: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    score_value: Number,
    score_game: String,
    score_multiplayer: Boolean,
    score_player_num: Number,
});

module.exports = mongoose.model('Score', ScoreSchema);
