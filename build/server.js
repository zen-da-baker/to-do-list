"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import Express
const express = require('express');
const app = express();
// Import passport
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
function passportAuthenticate() {
    passport.authenticate('local', { failureRedirect: '/login' });
}
// Import Bcrypt
const bcrypt = require('bcrypt');
// Import FS
const fs = require('fs');
// Import middleware
const morgan = require('morgan');
const cors = require('cors');
// Listen to port
const port = 80;
const listeningMsg = 'Listening to Port: ' + port;
// Module imports
const { getLogin, getAllTasks } = require('./modules/get.js');
const { newTask, newUser, login } = require('./modules/post.js');
const { editTask } = require('./modules/put.js');
const { deleteTask, deleteUser } = require('./modules/delete.js');
// Host public folder
// app.use(express.static('./public/index.html'));
// log info
app.use(morgan('tiny'));
// Enable CORS security
app.use(cors());
// Add authentication
app.use(passport.initialize());
/*
passport.use(new LocalStrategy(
  function(username: string, password: string, done: Function) {

    const result = fs.readFileSync(`./database/${username}.json`, 'utf8');
    const fileObj = JSON.parse(result);

    if (fileObj.username != username) {
      return done("File could not be found");
    }

    bcrypt.compare(password, hash);

    if (fileObj.username == username ) {
      done(null, )
    }

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
  */
// App GET login credentials
app.get('/login', getLogin);
// App GET all tasks
app.get('/tasks/:user', getAllTasks);
// App POST new task
app.post('/tasks/:user', newTask);
// User POST new user
app.post('/signup', newUser);
// User POST login
app.post('/login', login);
// App PUT edit task
app.put('/tasks/:user', editTask);
// App DELETE item
app.delete('/tasks/:user', deleteTask);
// App DELETE user
app.delete('/user/:user', deleteUser);
/*
app.use((err, req, res, next) => {
    if (!err.status) {
      err.status = 500;
    }
    res.status(err.status).send(err.message);
  })
*/
// App listen
app.listen(port, 'localhost', console.log(listeningMsg));
//# sourceMappingURL=server.js.map