// Import FS
const fs = require('fs');

// Import passport
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

function passportAuthenticate() {
    passport.authenticate('local', {failureRedirect: '/login'});
}

// Import bcrypt
const bcrypt = require('bcrypt');

// helper functions
const { newError, checkExistingUser } = require('./helper.js');

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

    if (checkExistingUser(username) == false) {
        console.log('User does not already exist, success');

        async function hashPassword(password, saltRounds) {
            try {
                const salt = await bcrypt.genSalt(saltRounds);

                const hash = await bcrypt.hash(password, salt);

                console.log('Hashing executed');

                return hash;
            } catch(err) {
                res.status(500).json({msg: "Error hashing the password of the user"});
                newError('Error with hashing the password of a new user: ', err);
            }
        }

        const hash = hashPassword(password, 5);

        console.log('hash password executed');

        console.log(hash);

        const data = {
            username: username,
            password: hash.toString(),
            list: []
        }

        const responseData = JSON.stringify(data);

        console.log('Data object prepared for file write');

        fs.writeFile(`./database/${username}.json`, responseData, (err) => {
            if (err) {
                res.status(500).json({msg: "Error writing the user file via POST"});
                newError('Write data failed in POST for new user: ', err);
            } else {
                console.log('Write successful');
            }
        })

        console.log('Successful file write status sent to client');

        return res.status(201).json({creation: true, username: username});
    } else {

        return res.status(403).json({msg: "User exists, cannot create new user"});
        
    }
}

function login(req, res, next) {
    const username = req.params.username;
    const password = req.params.password;

    const file = fs.readFileSync(`./database.${username}.json`, 'utf8');

    const obj = JSON.parse(file);

    const result = bcrypt.compare(password, obj.password);

    if (result == true) {
        res.status(200).json({validation: true});
    } else {
        res.status(403).json({validation: false});
    }
}

module.exports = { newTask, newUser, login };