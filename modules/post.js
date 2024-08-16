// Import FS
const fs = require('fs');

// helper functions
const { newError } = require('./helper.js');

// App POST new task
function newTask (req, res, next) {
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
}

// User POST new user
function newUser(req, res, next) {
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
}

module.exports = { newTask, newUser };