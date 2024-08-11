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
    
    function cypher(input) {
        const output = input;
        return output;
    }

    try {
        // Unsecure login via GET
        const response = await fetch(localhost + port + '/login' + `?username=${username}&password=${password}`);

        if (response.ok) {
            console.log('Login validated');

            const jsonResponse = await response.json();

            console.log(jsonResponse);

            app.style.display = 'block';
            loginScreen.style.display = 'none';

            fetchTasks();
        } else {
            msg.style.display = 'block';
            msg.innerHTML = `<p>Sign In not successful. Account not found.</p>`

            console.log('Login not valid');
            login = false;
        }

    } catch(err) {
        throw new Error('Login could not be completed via GET on the serverside: ' + err);
    }
}

// Create new user and JSON

// Encryption