// DOM elements
const app = document.getElementById('app');
const loginScreen = document.getElementById('login');

// Login state
let login = false;

// Login state logic
if (login == false) {
    app.style.display = 'none';
    loginScreen.style.display = 'block';
} else {
    app.style.display = 'block';
    loginScreen.style.display = 'none';
}

// Check login credintials 

// Create new user and JSON