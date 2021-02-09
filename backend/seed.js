// NOTE: Seed.js seeds a MongoDB database with content for Ourcade.
var db = require('./models')

// SCORES
var scoreList = [
  {
    "score_value": 111111111,
    "score_game": "",
    "score_multiplayer": "",
    "score_player_num": "Consulting web developer & designer",
  },
];

// DATABASE SEEDER / HELPER METHODS
// Remove old scores, create new ones, & exit process
db.Score.deleteMany({}, function(err, scores){
  if (err) { return console.log('SEED ERROR: ', err); }
  console.log(scores.length, ' scores removed!');
//   db.Score.create(scoreList, function(err, scores){
//     if (err) { return console.log('ERROR', err); }
//     console.log('created', scores.length, 'scores');
//   });
});

db.User.deleteMany({}, function(err, users){
  if (err) { return console.log('SEED ERROR: ', err); }
  console.log(users.length, ' users removed!');
//   db.User.create(userList, function(err, users){
//     if (err) { return console.log('ERROR', err); }
//     console.log('created', users.length, 'users');
    process.exit();
//   });
});

/* NOTE: New Score Template
  {
    "score_value": 111111111,
    "score_game": "",
    "score_multiplayer": "",
    "score_player_num": "Consulting web developer & designer",
  },
*/