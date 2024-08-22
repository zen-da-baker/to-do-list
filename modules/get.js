// Import FS
const fs = require('fs');

// Import passport
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Add authentication
app.use(passport.initialize());

passport.use(new LocalStrategy(
  function(username, password, done) {
    db.users.findByUsername(username, (err, user) => {
      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false);
      }

      if (user.password != password) {
        return done(null, false);
      }

      return done(null, user);
    })
  }
))

function passportAuthenticate() {
    passport.authenticate('local', {failureRedirect: '/login'});
}

// helper functions
const { newError } = require('./helper.js');

function checkCredentials(username, password) {
    let validationStatus = [false];

    function validation(data) {
        if (username === data.username && password === data.password) {
            console.log('Helper validation: ');
            console.log(true);

            return true;
        } else {
            console.log('Helper validation: ');
            console.log(false);

            return false;
        }
    }

    const result = fs.readFileSync(`./database/${username}.json`, 'utf8');

    const data = JSON.parse(result);

    console.log('Data parsed at login: ');
    console.log(data);

    const status = validation(data);

    validationStatus.push(status);


    console.log('Validation status array outside readFile: ');
    console.log(validationStatus);
    return validationStatus[1];
}

// App GET login credentials
function getLogin(req, res, next) {
    const username = req.query.username;
    const password = req.query.password;

    const validation = checkCredentials(username, password);

    console.log('Validation helper returned to GET request');
    console.log(validation);

    if (validation == true) {
        console.log("Login found and validated on server side");
        res.status(200).json({validation: true});
    } else {
        console.log("Login not found on server side");
        res.status(404).send();
    }
}

// App GET all tasks
function getAllTasks(req, res, next) {
    const user = req.params.user;

    console.log('User at GET: ' + user);

    fs.readFile(`./database/${user}.json`, 'utf8', (err, result) => {

        if (err) {
            res.status(404).send();
            newError('Could not read file', err);
        } else {
            const data = JSON.parse(result);
            res.status(200).json({data: data.list});
        }

    })
}

module.exports = { getLogin, getAllTasks };