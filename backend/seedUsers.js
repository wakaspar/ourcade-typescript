// NOTE: Seed.js seeds a MongoDB database with content for Ourcade.
var db = require('./models')

var userList = [
  {
    "username": "Adam",
    "email": "wakaspar@gmail.com",
    "password": "password",
    "password_again": "password",
  },
  {
    "username": "Jess",
    "email": "jcraine136@gmail.com",
    "password": "password",
    "password_again": "password",
  },
  {
    "username": "Steve",
    "email": "cap@america.com",
    "password": "password",
    "password_again": "password",
  },
  {
    "username": "Tony",
    "email": "iron@man.com",
    "password": "password",
    "password_again": "password",
  },
  {
    "username": "Indigo",
    "email": "cutest@puppies.com",
    "password": "password",
    "password_again": "password",
  },
  {
    "username": "Carol",
    "email": "cap@marvel.com",
    "password": "password",
    "password_again": "password",
  },
  {
    "username": "Wanda",
    "email": "wanda@vision.com",
    "password": "password",
    "password_again": "password",
  },
  {
    "username": "Percy",
    "email": "gloom@stalker.com",
    "password": "password",
    "password_again": "password",
  },
  {
    "username": "Lafaera",
    "email": "laf@era.com",
    "password": "password",
    "password_again": "password",
  },
  {
    "username": "Spry",
    "email": "not@old.com",
    "password": "password",
    "password_again": "password",
  },
];

// DATABASE SEEDER / HELPER METHODS
// Remove old users, create new ones, & exit process
db.User.deleteMany({}, function(err, users){
  if (err) { return console.log('SEED ERROR: ', err); }
  console.log(users.length, ' users removed!');
  // db.User.create(userList, function(err, users){
  //   if (err) { return console.log('ERROR', err); }
  //   console.log('created', users.length, 'users');
    process.exit();
  // });
});

/* NOTE: New User Template
  {
    "username": "username",
    "email": "email",
    "password": "password",
    "password_again": "password",
  },
*/