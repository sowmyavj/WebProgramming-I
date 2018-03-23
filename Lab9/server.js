var express = require('express');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var db = require('./db');
var flash = require('express-flash');

const bodyParser = require("body-parser");


// Configure the local strategy for use by Passport.

/* passport.use(new Strategy(
  function(username, password, cb) {
      db.users.findByUsername(username, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      //if (user.password != password) { return cb(null, false); }
      console.log("password, user.hashedPassword:"+password+" "+user.hashedPassword);
      db.users.comparePassword(password, user.hashedPassword, function(err, isMatch){
        if(err) throw err;
        if(isMatch){
          return cb(null, user);
        } else {
          return cb(null, false, {message: 'Invalid password'});
        }
      });
     // return cb(null, user);
    });
})); */
passport.use(new Strategy(
  function(username, password, done) {
    db.users.findByUsername(username, function(err, user){
   	if(err) throw err;
   	if(!user){
   		return done(null, false, {message: 'Unknown User'});
   	}

   	db.users.comparePassword(password, user.hashedPassword, function(err, isMatch){
   		if(err) throw err;
   		if(isMatch){
   			return done(null, user);
   		} else {
   			return done(null, false, {message: 'Invalid password'});
   		}
   	});
   });
  }));

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  db.users.findById(id, function (error, user) {
    if (error) { return cb(error); }
    cb(null, user);
  });
});


// Create a new Express application.
var app = express();

const exphbs = require('express-handlebars');

const Handlebars = require('handlebars');

const handlebarsInstance = exphbs.create({
    defaultLayout: 'main',
    // Specify helpers which are only registered on this instance.
    helpers: {
        asJSON: (obj, spacing) => {
            if (typeof spacing === "number")
                return new Handlebars.SafeString(JSON.stringify(obj, null, spacing));
        
            return new Handlebars.SafeString(JSON.stringify(obj));
        }
    }
});

const rewriteUnsupportedBrowserMethods = (req, res, next) => {
    // If the user posts to the server with a property called _method, rewrite the request's method
    // To be that method; so if they post _method=PUT you can now allow browsers to POST to a route that gets
    // rewritten in this middleware to a PUT route
    if (req.body && req.body._method) {
        req.method = req.body._method;
        delete req.body._method;
    }

    // let the next middleware run:
    next();
};
//app.use("/public", static);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(rewriteUnsupportedBrowserMethods);

app.engine('handlebars', handlebarsInstance.engine);
app.set('view engine', 'handlebars');
// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

app.use(flash());

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next){
	res.locals.user = req.user;
	next();
});
// Define routes.
app.get('/',
  function(req, res) {
    if (!req.isAuthenticated || !req.isAuthenticated()) {      
      res.render('login', { message: req.flash('error') });
    }else{
      res.redirect('/private');  
    }
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/private',
    failureRedirect: '/',
  	failureFlash: true
  }));  
app.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
  });

app.get('/private',
  require('connect-ensure-login').ensureLoggedIn("/"),
  function(req, res){
    res.render('profile', { user: req.user });
  });

  app.get('*',
  function(req, res) {
    res.redirect('/');
  });
app.listen(3000);
