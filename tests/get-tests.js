const assert = require('assert');
const fs = require('fs');

describe('GET all list items from user', () => {
    // Any hooks for set up
    // Setup
    let originalObj = {
        username: 'test',
        password: 'test',
        list: ['cook dinner']
    };

    originalObj = JSON.stringify(originalObj);

    let obj = {};
    let newObj = {};

    let path = '../database/test.json';

    before(() => {
        let path = '../database/test.json';
    })

    beforeEach(() => {
        // Setup

        fs.writeFile(path, originalObj, (err) => {
            if (err) {
                throw new Error(err);
            }
        })
    })

    afterEach(() => {
        fs.unlinkSync(path);
    })

    it('Writes a file named test', () => {
        // Setup
        let output = [];

        function storeResult(res) {
            output.push(res);
        }

        fs.readFile(path, 'utf8', (err, result) => {
            if (err) {
                throw new Error(err);
            } else {
                let res = JSON.parse(result);

                storeResult(res);
            }
        })

        //Exercise
        obj = output[0];

        // Verification
        assert.ok(output[0].list[0] == 'cook dinner');

        // Teardown
    })

    it('reads the user JSON file and returns the list of the apprpriate user', () => {
        // Setup
        obj = fs.readFile(path, 'utf8', (err, result) => {
            if (err) {
                throw new Error(err);
            } else {
                return result;
            }
        })

        obj = JSON.parse(obj);

        // Exercise
        obj.list.push('eat pancakes');

        obj = JSON.stringify(obj)

        fs.writeFile(path, obj, (err) => {
            if (err) {
                throw new Error(err);
            }
        })

        newObj = fs.readFile(path, 'utf8', (err, result) => {
            if (err) {
                throw new Error(err);
            } else {
                return result;
            }
        })

        newObj = JSON.parse(newObj);

        // Verification
        assert.ok(newObj.list[1] === 'eat pancakes');

        // Teardown

    })
})