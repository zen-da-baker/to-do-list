// Import Express
const express = require('express');
const app = express();

// Import FS
const fs = require('fs');

// Listen to port
const port = 5500;
const listeningMsg = 'Listening to Port: ' + port;

// Module imports
const { newError, findIndex, checkCredentials } = require('./modules/helper.js');

// Host public folder
app.use(express.static('public'));

// App GET login credentials
app.get('/login', (req, res, next) => {
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

})

// App GET all tasks
app.get('/tasks/:user', (req, res, next) => {
    const user = req.params.user;

    console.log('User at GET: ' + user);

    fs.readFile(`./database/${user}.json`, 'utf8', (err, result) => {

        if (err) {
            res.status(404).send();
            newError('Could not read file', err);
        } else {
            const data = JSON.parse(result);
            res.status(200).json({data: data});
        }

    })
})

// App POST new task
app.post('/tasks/:user', (req, res, next) => {
    const user = req.params.user;
    
    console.log('req.query.task');
    console.log(req.query.task);

    fs.readFile(`./database/${user}.json`, 'utf8', (err, result) => {
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

            fs.writeFile(`./database/${user}.json`, returnData, (err) => {
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

// User POST new user
app.post('/signup', (req, res, next) => {
    const username = req.query.username;
    const password = req.query.password;

    fs.readFile(`./database/${username}.json`, 'utf8', (err, result) => {
        if (!result) {
            const data  = {
                username: username,
                password: password,
                list: []
            };

            const responseData = JSON.stringify(data);

            console.log('Response data string: ');
            console.log(responseData);

            fs.writeFile(`./database/${username}.json`, responseData, (err) => {
                if (err) {
                    newError('Write failed in POST for new user', err);
                } else {
                    console.log('Write successful');
                }
            });

            res.status(201).json({creation: true, username: username});
        } 

        if (err) {
            res.status(403).send();
        }
    });
})

// App PUT edit task
app.put('/tasks/:user', (req, res, next) => {
    const user = req.params.user;

    const original = req.query.original;
    const edit = req.query.edit;

    console.log('Original: ' + original);
    console.log('Edit: ' + edit);

    fs.readFile(`./database/${user}.json`, 'utf8', (err, result) => {
        if (err) {
            newError('Could not read file: ', err);
        } else {
            let data = JSON.parse(result);

            const originalIndex = findIndex(original, data.list);
            console.log('originalIndex: ');
            console.log(originalIndex);

            if (originalIndex !== -1) {
                data.list[originalIndex] = edit;

                console.log('Data object after edit');
                console.log(data);

                let returnData = JSON.stringify(data);

                console.log('returnData stringify: ');
                console.log(returnData);

                fs.writeFile(`./database/${user}.json`, returnData, (err) => {
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
app.delete('/tasks/:user', (req, res, next) => {
    const user = req.params.user;

    const target = req.query.task;
    console.log('Target: ' + target);

    fs.readFile(`./database/${user}.json`, 'utf8', (err, result) => {
        if (err) {
            res.status(404).send();
            newError('Could not read file: ' + err);
        } else {
            console.log('Result: ');
            console.log(result);

            let data = JSON.parse(result);

            console.log('Data object parsed: ');
            console.log(data);

            const targetIndex = findIndex(target, data.list);
            console.log('Target index: ');
            console.log(targetIndex);

            if (targetIndex === -1) {
                res.status(404).send();
            } else {
                data.list.splice(targetIndex, 1);

                const returnData = JSON.stringify(data);

                fs.writeFile(`./database/${user}.json`, returnData, (err) => {
                    if (err) {
                        newError('Could not write DELETE request: ', err);
                    } else {
                        console.log('Write successful');
                        res.status(204).send();
                    }
                })
            }
            
        }
    })
})

// App listen
app.listen(port, console.log(listeningMsg));