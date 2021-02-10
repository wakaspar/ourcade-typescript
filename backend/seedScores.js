// NOTE: Seed.js seeds a MongoDB database with content for Ourcade.
var db = require('./models')

// SCORES
var scoreList = [
  {
    "_player" : "_player",
    "score_value": 111111111,
    "score_game": "Black Pyramid",
    "score_multiplayer": true,
    "score_player_num": 3,
  },
];


// DATABASE SEEDER / HELPER METHODS
// Remove old scores, create new ones, & exit process
db.Score.deleteMany({}, function(err, scores){
  if (err) { return console.log('SEED ERROR: ', err); }
  console.log(scores.length, ' scores removed!');
  // db.Score.create(scoreList, function(err, scores){
  //   if (err) { return console.log('ERROR', err); }
  //   console.log('created', scores.length, 'scores');
    process.exit();
  // });
});


/* NOTE: New Score Template
  {
    "_player" : "_player",
    "score_value": 111111111,
    "score_game": "",
    "score_multiplayer": "",
    "score_player_num": "Consulting web developer & designer",
  },
*/