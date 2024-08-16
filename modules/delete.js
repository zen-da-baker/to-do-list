// Import FS
const fs = require('fs');

// helper functions
const { newError, findIndex } = require('./helper.js');

// App DELETE item
function deleteTask (req, res, next) {
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
}

module.exports = { deleteTask };