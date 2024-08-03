// DOM elements

let taskValue = document.getElementById('new-task-input').value;

// Localhost
const localhost = 'http://localhost';
const port = ':5500';
const tasks = '/tasks';

// API calls

// GET list
async function fetchTasks() {
    try {
        const response = await fetch(localhost + port + tasks);

        if (response.ok) {
            const jsonResponse = await response.json();
            console.log(jsonResponse);
            console.log(jsonResponse.data.list[0]);
            document.getElementById('task-1').innerHTML = jsonResponse.data.list[0];
        } else {
            throw new Error('Response not ok');
        }
    } catch(err) {
        throw new Error('Serverside error fetching response' + err);
    }
}

function captureInput(id) {
    const input = document.getElementById(id).value;
    console.log('captureInput value: ' + input);
    return input;
}

// Create list item
async function createTask(value) {
    try {
        const response = await fetch(localhost + port + tasks + `?task=${value}`, {method: 'post'});

        console.log('createTask value: ' + value);

        if (response.ok) {
            const jsonResponse = await response.json();

            console.log(jsonResponse);
        }
    } catch(err) {
        throw new Error('Serverside error creating a new task: ' + err);
    }
}

// Edit list item given a original name and new name
async function editTask(original, edit) {
    try {
        console.log('Original: ' + original);
        console.log('Edit: ' + edit);

        const response = await fetch(localhost + port + tasks + `?original=${original}&edit=${edit}`, {method: 'put'});

        

        if (response.ok) {
            const jsonResponse = await response.json();

            console.log(jsonResponse);
        }
    } catch(err) {
        throw new Error('Serverside PUT error: ' + err); 
    }
}

// Delete list item given a name
async function deleteTask(value) {
    try {
        console.log(value);

        const response = await fetch(localhost + port + tasks + `?task=${value}`, {method: 'delete'});

            if (response.ok) {
                const jsonResponse = response.json();

                console.log(jsonResponse);
            }
        
    } catch(err) {
        throw new Error('Serverside DELETE error: ' + err);
    }
}


// Event Listeners

// Create task
/*
document.getElementById('new-task-btn').addEventListener(
    "click", 
    createTask(taskValue)
);
*/
