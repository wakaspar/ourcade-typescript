// Dependency list
const express = require('express'),
    app = express(),
    db = require('./models'),
    controllers = require('./controllers'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    PORT = 4000;



app.use(bodyParser.json());
app.use(cookieParser());

// Config express-session
app.use(session({
  secret: 'ourcadesecret00', // change this!
  resave: false,
  saveUninitialized: false
}));

// Initialize passport & start a passport session
app.use(passport.initialize());
app.use(passport.session());
// Passport config
passport.use(new LocalStrategy(db.User.authenticate()));
passport.serializeUser(db.User.serializeUser());
passport.deserializeUser(db.User.deserializeUser());

// Prevent CORS errors
app.use(cors());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  //Remove caching
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

// Connect to database
mongoose.connect('mongodb://127.0.0.1:27017/ourcade-ts', { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
// Database sanity check
connection.once('open', function() {
    console.log('MongoDB database connection established successfully');
})

// API Routes
app.get('/api/', controllers.api.index);

// SCORES Routes
app.get('/api/scores', controllers.score.index);
app.get('/api/scores/:id', controllers.score.show);
app.post('/api/scores', controllers.score.create);
app.put('/api/scores/:id', controllers.score.update);
app.delete('/api/scores/:id', controllers.score.destroy);

// USER Routes
app.get('/api/users', controllers.user.index);
app.get('/api/users', controllers.user.show);
// app.post('/api/users', controllers.user.create);
app.put('/api/users', controllers.user.update);
app.delete('/api/users', controllers.user.destroy);

// AUTH Routes
let User = db.User
// Signup new account
app.post('/api/signup', function signup(req, res) {
    console.log('inside api/signup!');
    console.log(`${req.body.username} ${req.body.password}`);
    User.register(new User({ username: req.body.username }), req.body.password,
      function (err, newUser) {
        passport.authenticate('local')(req, res, function() {
          res.send(newUser);
        });
      }
    )
});
// Login account
app.post('/api/login', passport.authenticate('local'), function (req, res) {
    console.log('=> /api/login/ req.user: ', JSON.stringify(req.user));
    console.log(' '); // new line placeholder
    res.send(req.user);
  });

// Logout account
app.post('/api/logout', function (req, res) {
    console.log("BEFORE logout", req);
    req.logout();
    res.send(req);
    console.log("AFTER logout", req);
});

// Express listening on PORT 4000
app.listen(PORT, function() {
    console.log('Server is running on Port: ' + PORT);
});