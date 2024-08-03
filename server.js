// Import Express
const express = require('express');
const app = express();

// Import FS
const fs = require('fs');

// Listen to port
const port = 5500;
const listeningMsg = 'Listening to Port: ' + port;

// Module imports

// Helper functions
function newError(msg, err) {
    throw new Error(msg + err);
}

function findIndex(name, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (name === arr[i]) {
            return i;
        }
    }
}

// Host public folder
app.use(express.static('public'));

// App GET all tasks
app.get('/tasks', (req, res, next) => {
    fs.readFile('./database/tasks.json', 'utf8', (err, result) => {

        if (err) {
            newError('Could not read file', err);
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
            newError('Could not read file: ', err);
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
                    newError('Write failed in POST: ', err);
                } else {
                    console.log('Write successful');
                }
            });

            const lastIndex = data.list.length - 1;
            
            res.status(201).json({data: data.list[lastIndex]});
        }
    })
})

// App PUT edit task
app.put('/tasks', (req, res, next) => {
    const original = req.query.original;
    const edit = req.query.edit;

    console.log('Original: ' + original);
    console.log('Edit: ' + edit);

    fs.readFile('./database/tasks.json', 'utf8', (err, result) => {
        if (err) {
            newError('Could not read file: ', err);
        } else {
            let data = JSON.parse(result);

            const originalIndex = findIndex(original, data.list);

            if (originalIndex) {
                data.list[originalIndex] = edit;

                console.log('Data object after edit');
                console.log(data);

                let returnData = JSON.stringify(data);

                console.log('returnData stringify: ');
                console.log(returnData);

                fs.writeFile('./database/tasks.json', returnData, (err) => {
                    if (err) {
                        newError('Write failed in PUT: ', err);
                    } else {
                        console.log('Write successful');
                        console.log(returnData);
                        
                        res.status(200).json({data: data.list[originalIndex]});
                    }
                })
            } else {
                res.status(404).send();
            }
        }
    })
})

// App DELETE item
app.delete('/tasks', (req, res, next) => {
    const target = req.query.task;
    console.log('Target: ' + target);

    fs.readFile('./database/tasks.json', 'utf8', (err, result) => {
        if (err) {
            newError('Could not read file: ' + err);
        } else {
            console.log('Result: ');
            console.log(result);

            let data = JSON.parse(result);

            console.log('Data object parsed');
            console.log(data);

            const targetIndex = findIndex(target, data.list);

            if (!targetIndex) {
                res.status(404).send();
            }

            data.list.splice(targetIndex, 1);

            const returnData = JSON.stringify(data);

            fs.writeFile('./database/tasks.json', returnData, (err) => {
                if (err) {
                    newError('Could not write DELETE request: ', err);
                } else {
                    console.log('Write successful');
                }
            })
        }
    })

    fs.readFile('./database/tasks.json', 'utf8', (err, result) => {
        if (err) {
            newError('Could not read file after DELETE request: ', err);
        } else {
            console.log('Result after data write: ');
            console.log(result);

            res.status(204).send();
        }
    })
})

// App listen
app.listen(port, console.log(listeningMsg));