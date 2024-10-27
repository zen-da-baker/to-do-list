"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import FS
const fs = require('fs');
// Helper functions
function newError(msg, err) {
    throw new Error(msg + err);
}
function findIndex(name, arr) {
    let i = 0;
    while (i < arr.length) {
        if (name === arr[i]) {
            return i;
        }
        else {
            i++;
        }
    }
    if (i == arr.length) {
        return -1;
    }
    /*
        for (let i = 0; i < arr.length; i++) {
            if (name === arr[i]) {
                return i;
            }

            if (i == arr.length) {
                return -1;
            }
        }
    */
}
function checkCredentials(username, password) {
    let validationStatus = [false];
    function validation(data) {
        if (username === data.username && password === data.password) {
            console.log('Helper validation: ');
            console.log(true);
            return true;
        }
        else {
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
function checkExistingUser(username) {
    const file = fs.readFileSync('./database/users.json', { encoding: 'utf8', flag: 'r' });
    const obj = JSON.parse(file);
    return obj.users.includes(username);
    /*
    const status = ['blah'];

    fs.readFile(`./database/users.json`, 'utf8', async (err, result) => {

        if (err) {
            throw new Error(err);
        }

        const userList = JSON.parse(result);

        console.log("checkExistingUsers value: " + userList.users.includes(username));

        const match = await userList.users.includes(username);

        if (match == true) {
            status.push("true");
        } else {
            status.push("false");
        }
    })

    console.log("status array " + status[1]);

    if (status[1] == true) {
        return true;
    } else {
        return false;
    }
        */
}
module.exports = { newError, findIndex, checkCredentials, checkExistingUser };
//# sourceMappingURL=helper.js.map