"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import FS
const fs = require('fs');
// Import Bcrypt
const bcrypt = require('bcrypt');
// helper functions
const { newError, findIndex, checkExistingUser } = require('./helper.js');
// App DELETE item
function deleteTask(req, res, next) {
    const user = req.params.user;
    const target = req.query.task;
    console.log('Target: ' + target);
    fs.readFile(`./database/${user}.json`, 'utf8', (err, result) => {
        if (err) {
            res.status(404).send();
            newError('Could not read file: ' + err);
        }
        else {
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
            }
            else {
                data.list.splice(targetIndex, 1);
                const returnData = JSON.stringify(data);
                fs.writeFile(`./database/${user}.json`, returnData, (err) => {
                    if (err) {
                        newError('Could not write DELETE request: ', err);
                    }
                    else {
                        console.log('Write successful');
                        res.status(204).send();
                    }
                });
            }
        }
    });
}
// Delete User
async function deleteUser(req, res, next) {
    const username = req.params.user;
    const password = req.query.password;
    const match = checkExistingUser(username);
    console.log("Delete User Match: " + match);
    if (match) {
        const file = fs.readFileSync(`./database/${username}.json`, { encodning: 'utf8', flag: 'r' });
        const obj = JSON.parse(file);
        const result = await bcrypt.compare(password, obj.password);
        console.log("result from match");
        if (result == true) {
            fs.unlink(`./database/${username}.json`, (err) => {
                if (err) {
                    console.log("Could not remove file for " + username);
                    res.status(500).json({ msg: err });
                    throw new Error(err);
                }
                else {
                    console.log("File removal for " + username + " was successful.");
                    const file = fs.readFileSync('./database/users.json', { encoding: "utf8", flag: 'r' });
                    const data = JSON.parse(file);
                    data.users.pop(username);
                    const returnData = JSON.stringify(data);
                    fs.writeFile('./database/users.json', returnData, (err) => {
                        if (err) {
                            console.log("Write file error to Users database: " + err);
                            return res.status(500).json({
                                msg: "Write file error for User database when attempting to delete a user."
                            });
                        }
                    });
                    res.status(200).json({ msg: "User deletion successful" });
                }
            });
        }
        else {
            res.status(403).json({ msg: "Password invalid" });
        }
    }
    else {
        res.status(500).json({ msg: "User not found" });
    }
}
module.exports = { deleteTask, deleteUser };
//# sourceMappingURL=delete.js.map