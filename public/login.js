// DOM elements
const app = document.getElementById('app');
const loginScreen = document.getElementById('login');

const loginBtn = document.getElementById('login-btn');

// localhost path
const loginPath = 'http://localhost:5500/login';

// Verify login through local storage
let loginStatus;

// LocalStorage login
params.push(localStorage.getItem('username'));

function verifyLogin() {
    if (localStorage.getItem('loginStatus') == undefined) {
        localStorage.setItem('loginStatus', 'false');
        loginStatus = false;
    }

    if (localStorage.getItem('loginStatus') == 'false') {
        loginStatus = false;
    }

    if (localStorage.getItem('loginStatus') == 'true' && localStorage.getItem('username') !== null) {
        loginStatus = true;

        console.log('Login Status: ');
        console.log(localStorage.getItem('loginStatus'));
    } else {
        loginStatus = false;

        console.log('Login Status: ');
        console.log(localStorage.getItem('loginStatus'));
    }
}

// Signout
function signout() {
    app.style.display = 'none';
    loginScreen.style.display = 'block';

    document.getElementById("login-username").value = '';
    document.getElementById("login-password").value = '';
    document.getElementById("signup-username").value = '';
    document.getElementById("signup-password").value = '';

    loginStatus = false;

    localStorage.setItem('loginStatus', 'false');
    localStorage.removeItem('username');
}

// Login state logic
if (loginStatus == false) {
    app.style.display = 'none';
    loginScreen.style.display = 'block';
} else {
    app.style.display = 'block';
    loginScreen.style.display = 'none';
}

// Check login credintials 
async function submitCredentials(username, password) {
    
    /*
    function cypher(input) {
        const output = input;
        return output;
    }
    */

    try {
        // Unsecure login via GET
        const response = await fetch(localhost + port + '/login' + `?username=${username}&password=${password}`);

        if (response.ok) {
            console.log('Login validated');

            const jsonResponse = await response.json();

            console.log(jsonResponse);

            app.style.display = 'block';
            loginScreen.style.display = 'none';

            localStorage.setItem('loginStatus', true);
            localStorage.setItem('username', `${username}`);

            params.push(`${username}`);

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