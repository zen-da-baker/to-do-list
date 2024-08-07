// DOM elements
let display = document.getElementById('display-tasks');

// Localhost
// const localhost = 'http://localhost';
const localhost = 'http://192.168.2.156'
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

// Store inputs for edits
let inputs = [];

// Clear arrays

function clearArr(arr) {

    while (arr.length > 0) {
        arr.pop();
    }

    console.log('Array after clearArr');
    console.log(arr);
}

function captureOriginal(original) {
    inputs.push(original);
}

function captureEdit(edit) {
    inputs.push(edit);

    editTask(inputs[findLastIndex(inputs) - 1], inputs[findLastIndex(inputs)]);
}

// Display function
function displayData(list) {

    clearArr(taskList);

    for (let i = 0; i < list.length; i++) {
        taskList.push(
            `<div class="flex item"> 
            
                <input class="checkbox" type="checkbox" id="checkbox${i}" /> 

                <input 
                    type="text" class="inline-text" value="${list[i]}" id="item-${i}" 
                    onclick="captureOriginal(captureInput('item-${i}'))" 
                    onchange="captureEdit(captureInput('item-${i}'))"
                />

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

    console.log('displayData taskList: ');
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
        
        clearArr(inputs);

        if (response.ok) {
            const jsonResponse = await response.json();

            display.innerHTML = '';


            fetchTasks()

            console.log(inputs);

            console.log(jsonResponse);
        } else {
            console.log(inputs);
            throw new Error('Could not submit PUT request: ' + err);
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
