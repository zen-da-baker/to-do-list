// DOM elements
let display = document.getElementById('display-tasks');

// Localhost
const localhost = 'http://localhost';
const port = ':5500';
const tasks = '/tasks';
const params = ['user'];
const lastIndex = params.length - 1;

// Helper functions
function findLastIndex(arr) {
    return arr.length - 1;
}

// Signout
function signout() {
    app.style.display = 'none';
    loginScreen.style.display = 'block';

    document.getElementById("login-username").value = '';
    document.getElementById("login-password").value = '';
    document.getElementById("signup-username").value = '';
    document.getElementById("signup-password").value = '';
}

// Display Tasks list
let taskList = [];

// Display function
function displayData(list) {
    

    for (let i = 0; i < list.length; i++) {
        taskList.push(
            `<div class="flex item"> 
            
                <input class="checkbox" type="checkbox" id="checkbox${i}" /> 

                <input type="text" class="inline-text" value="${list[i]}" />

                <button 
                    class="inline-btn btn danger-btn" 
                    onclick="deleteTask(
                    '${list[i]}'
                    )">
                    X
                </button> 
            </div>`
        );
    }

    console.log('displayData tasks: ');
    console.log(taskList);

    display.innerHTML = taskList.join(" ");
}

// Add task
function addTask() {
    const add = document.getElementById('add-task');

    display.innerHTML = '';

    taskList.push(
            `<div class="flex item">
                <input class="checkbox" type="checkbox" id="checkbox${taskList.length}" />

                <input type="text" class="inline-text" value="" id="item${taskList.length}" />

                <button class="inline-btn btn" onclick="createTask(captureInput('item${taskList.length}'))">
                    Create
                </button> 

                <button class="inline-btn btn danger-btn" onclick="deleteTask('${taskList.length}')">
                    X
                </button> 
            </div>
        `)

    display.innerHTML = taskList.join(" ");

    console.log(taskList);
}

// Store user
function storeUser(username) {
    params.push(username);

    console.log('User: ' + username);
}

// API calls

// GET list
async function fetchTasks() {
    try {
        const response = await fetch(localhost + port + tasks + `/${params[findLastIndex(params)]}`);

        if (response.ok) {
            const jsonResponse = await response.json();
            console.log(jsonResponse);
            console.log(jsonResponse.data.list[0]);

            // document.getElementById('task-1').innerHTML = jsonResponse.data.list[0];

            taskList.pop(taskList.length);

            display.innerHTML = '';

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
        const response = await fetch(localhost + port + tasks + `/${params[findLastIndex(params)]}` + `?task=${value}`, {method: 'post'});

        console.log('createTask value: ' + value);

        document.getElementById('new-task-input').value = '';

        if (response.ok) {
            const jsonResponse = await response.json();

            display.innerHTML = '';

            taskList.pop(taskList.length);

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

        const response = await fetch(localhost + port + tasks + `/${params[findLastIndex(params)]}` + `?original=${original}&edit=${edit}`, {method: 'put'});

        document.getElementById('original-task').value = '';
        document.getElementById('new-task').value = '';
        

        if (response.ok) {
            const jsonResponse = await response.json();

            display.innerHTML = '';
            taskList.pop(taskList.length);

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

        const response = await fetch(localhost + port + tasks + `/${params[findLastIndex(params)]}` + `?task=${value}`, {method: 'delete'});

        document.getElementById('target-task').value = '';

        if (response.ok) {
            display.innerHTML = '';
            taskList.pop(taskList.length);
            fetchTasks();
        }
        
    } catch(err) {
        throw new Error('Serverside DELETE error: ' + err);
    }
}

if (app.style.display == 'block') {
    fetchTasks();
}


// Event Listeners

// Create task
/*
document.getElementById('new-task-btn').addEventListener(
    "click", 
    createTask(taskValue)
);
*/
