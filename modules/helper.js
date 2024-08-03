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

module.exports = { newError, findIndex };