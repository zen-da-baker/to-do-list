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
    
    console.log('req.query.task');
    console.log(req.query.task);

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

            fs.writeFile('./database/tasks.json', returnData, (err) => {
                if (err) {
                    throw new Error('Write failed: ' + err);
                } else {
                    console.log('Write successful');
                }
            });

            const lastIndex = data.list.length - 1;
            
            res.status(201).json({data: data.list[lastIndex]});
        }
    })
})

// App listen
app.listen(port, console.log(listeningMsg));