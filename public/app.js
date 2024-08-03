// DOM elements
let display = document.getElementById('display-tasks');

// Localhost
const localhost = 'http://localhost';
const port = ':5500';
const tasks = '/tasks';

// Display function
function displayData(list) {
    let tasks = [];

    for (let i = 0; i < list.length; i++) {
        tasks.push(`<p>${i}. ${list[i]}</p>`);
    }

    console.log('displayData tasks: ');
    console.log(tasks);

    display.innerHTML = tasks.join(" ");
}

// API calls

// GET list
async function fetchTasks() {
    try {
        const response = await fetch(localhost + port + tasks);

        if (response.ok) {
            const jsonResponse = await response.json();
            console.log(jsonResponse);
            console.log(jsonResponse.data.list[0]);

            // document.getElementById('task-1').innerHTML = jsonResponse.data.list[0];

            displayData(jsonResponse.data.list);
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

        document.getElementById('new-task-input').value = '';

        if (response.ok) {
            const jsonResponse = await response.json();

            fetchTasks();

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

        document.getElementById('original-task').value = '';
        document.getElementById('new-task').value = '';
        

        if (response.ok) {
            const jsonResponse = await response.json();

            fetchTasks()

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

        document.getElementById('target-task').value = '';

        if (response.ok) {
            fetchTasks();
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
