// Import Express
const express = require('express');
const app = express();

// Import FS
const fs = require('fs');

// Listen to port
const port = 5500;
const listeningMsg = 'Listening to Port: ' + port;

// Module imports

// Host public folder
app.use(express.static('public'));

// App GET all tasks
app.get('/tasks', (req, res, next) => {
    fs.readFile('./database/tasks.json', 'utf8', (err, result) => {

        if (err) {
            throw new Error('Could not read file: ' + err);
        } else {
            const data = JSON.parse(result);
            res.status(200).json({data: data});
        }

    })
})

// App POST new task
app.post('/tasks', (req, res, next) => {
    fs.readFile('./database/tasks.json', 'utf8', (err, result) => {
        if (err) {
            throw new Error('Could not read file: ' + err);
        } else {

            console.log('result: ');
            console.log(result);

            let data = JSON.parse(result);

            data.list.push(req.query.task);

            let returnData = JSON.stringify(data);

            console.log('returnData: ');
            console.log(returnData);

            if (returnData == null) {
                throw new Error('Returned null: ' + err);
            } else {
                fs.writeFile('./database/tasks.json', returnData, 'utf8', () => {
                    console.log('Write successful');
                });
            }

            fs.readFile('./database/tasks.json', 'utf8', (err, results) => {
                if (err) {
                    throw new Error('There was an error reading the database file after creating a new item: ' + err);
                } else {
                    let newData = JSON.parse(results);
                    res.status(200).json({data: newData});
                }
            })
        }
    })
})

// App listen
app.listen(port, console.log(listeningMsg));