// DOM elements
const app = document.getElementById('app');
const loginScreen = document.getElementById('login');

const loginBtn = document.getElementById('login-btn');

// localhost path
const loginPath = 'http://localhost:5500/login';

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
async function submitCredentials(username, password) {
    try {
        // Unsecure login via GET
        const response = await fetch(loginPath + `?username=${username}&password=${password}`);

        if (response.ok) {
            console.log('Login validated');

            const jsonResponse = response.json();

            if (jsonResponse.validation == true) {

                console.log(jsonResponse);

                login = true;

                app.style.display = 'block';
                loginScreen.style.display = 'none';
            }
        } else {
            console.log('Login not valid');
            login = false;
        }

    } catch(err) {
        throw new Error('Login could not be completed via GET on the serverside: ' + err);
    }
}

// Create new user and JSON

// Encryption