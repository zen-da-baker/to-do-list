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

// Create list item
async function createTask(value) {
    try {
        const response = await fetch(localhost + port + tasks + `?string=${value}`);

        if (response.ok) {
            const jsonResponse = await response.json();

            console.log(jsonResponse);
        }
    } catch(err) {
        throw new Error('Serverside error creating a new task: ' + err);
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
