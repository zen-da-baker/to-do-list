// Helper functions

// Clears chosen array items
function clearArr(arr) {

    while (arr.length > 0) {
        arr.pop();
    }

    console.log('Array after clearArr');
    console.log(arr);
}

// Captures the value of a DOM element with a chosen id, that id is the argument of the function, logs all inputs except passwords
function captureInput(id) {
    const input = document.getElementById(id).value;

    if (id !== 'signup-password' && id !== 'login-password') {
        console.log('captureInput value: ' + input);
    }

    return input;
}

// Capture an input and sends it to an array, relies on the captureInput(id) as an argument
function captureOriginal(original) {
    inputs.push(original);
}

// Capture an input and sends it to an array, relies on the captureInput(id) as an argument
function captureEdit(edit) {
    inputs.push(edit);

    editTask(inputs[findLastIndex(inputs) - 1], inputs[findLastIndex(inputs)]);
}

// Store username to an array for accessing the user's to do list later
function storeUser(username) {
    params.push(username);

    console.log('User: ' + username);
}

