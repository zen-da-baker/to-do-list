// Import Express
const express = require('express');
const app = express();

// Import FS
const fs = require('fs');

// Import middleware
const morgan = require('morgan');
const cors = require('cors');

// Listen to port
const port = 5500;
const listeningMsg = 'Listening to Port: ' + port;

// Module imports
const { getLogin, getAllTasks } = require('./modules/get.js');
const { newTask, newUser } = require('./modules/post.js');
const { editTask } = require('./modules/put.js');
const { deleteTask } = require('./modules/delete.js');

// Host public folder
app.use(express.static('public'));

// log info
app.use(morgan('tiny'));

// Enable CORS security
app.use(cors());

// App GET login credentials
app.get('/login', getLogin);

// App GET all tasks
app.get('/tasks/:user', getAllTasks);

// App POST new task
app.post('/tasks/:user', newTask);

// User POST new user
app.post('/signup', newUser);

// App PUT edit task
app.put('/tasks/:user', editTask);

// App DELETE item
app.delete('/tasks/:user', deleteTask);

app.use((err, req, res, next) => {
    if (!err.status) {
      err.status = 500;
    }
    res.status(err.status).send(err.message);
  })

// App listen
app.listen(port, 'localhost', console.log(listeningMsg));