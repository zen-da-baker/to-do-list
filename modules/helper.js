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
        } else {
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
    let validationStatus = [];

    function validation(data) {
        if (username === data.username && password === data.password) {
            console.log('Helper validation: ');
            console.log('true');

            validationStatus.push('true');
        } else {
            console.log('Helper validation: ');
            console.log('false');

            validationStatus.push('false');
        }
    }

    fs.readFile(`./database/${username}.json`, 'utf8', (err, result) => {
        if (err) {
            throw new Error('Could not read file: ' + err);
        } else {
            const data = JSON.parse(result);

            console.log('Data parsed at login: ');
            console.log(data);

            validation(data);
        }
    })

    console.log('Validation status array: ');
    console.log(validationStatus);
    return validationStatus[0];
}

module.exports = { newError, findIndex, checkCredentials };