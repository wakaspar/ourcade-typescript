// Dependency list:
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

// EXPRESS SERVER CONFIGURATION:
// Config express middleware:
app.use(bodyParser.json());
app.use(cookieParser());
// Config express-session:
app.use(session({
  secret: 'ourcadesecret00', // TODO: change this!
  resave: false,
  saveUninitialized: false
}));
// Initialize passport & start a passport session:
app.use(passport.initialize());
app.use(passport.session());
// Passport config:
passport.use(new LocalStrategy(db.User.authenticate()));
passport.serializeUser(db.User.serializeUser());
passport.deserializeUser(db.User.deserializeUser());
// Prevent CORS errors:
app.use(cors());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  //Remove caching:
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

// MONGODB INSTANCE CONNECTION:
// Connect to database:
mongoose.connect('mongodb://127.0.0.1:27017/ourcade-ts', { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
// Database sanity check:
connection.once('open', function() {
    console.log('MongoDB database connection established successfully');
    console.log(' '); // new line placeholder
})

// API v.1.0:
// Index route:
app.get('/api/', controllers.api.index);
// Scores routes:
app.get('/api/scores', controllers.score.index);
app.get('/api/scores/:id', controllers.score.show);
app.post('/api/scores', controllers.score.create);
app.put('/api/scores/:id', controllers.score.update);
app.delete('/api/scores/:id', controllers.score.destroy);
// User routes:
app.get('/api/users', controllers.user.index);
app.get('/api/users/:id', controllers.user.show);
app.post('/api/signup', controllers.user.signup);
app.put('/api/users/:id', controllers.user.update);
app.delete('/api/users/:id', controllers.user.destroy);
// Auth routes:
app.post('/api/login', passport.authenticate('local'), controllers.auth.login);
app.post('/api/logout', controllers.auth.logout);

// Express listening on PORT 4000:
app.listen(PORT, function() {
    console.log('Server is running on Port: ' + PORT);
});