// DOM elements
const app = document.getElementById('app');
const loginScreen = document.getElementById('login');

const loginBtn = document.getElementById('login-btn');

// localhost path
const loginPath = 'http://localhost:80/login';

// Helper function
// Find last index of an array
function findLastIndex(arr) {
    const value = arr.length - 1;
    return value;
}

// Verify login through local storage
let loginStatus = {};

loginStatus.verify = localStorage.getItem('loginStatus');
console.log(loginStatus.verify);

// LocalStorage login
params.push(localStorage.getItem('username'));

function verifyLogin() {
    if (localStorage.getItem('loginStatus') == undefined || localStorage.getItem('loginStatus') == null) {
        localStorage.setItem('loginStatus', 'false');
        loginStatus.verify = false;
    }

    if (localStorage.getItem('loginStatus') == 'false') {
        loginStatus.verify = false;
    }

    if (localStorage.getItem('loginStatus') == 'true' && localStorage.getItem('username') !== null) {
        loginStatus.verify = true;

        console.log('Login Status: ');
        console.log(localStorage.getItem('loginStatus'));

        fetchTasks();
    } else {
        loginStatus.verify = false;

        console.log('Login Status: ');
        console.log(localStorage.getItem('loginStatus'));
    }
}

verifyLogin();

// Signout
function signout() {
    app.style.display = 'none';
    loginScreen.style.display = 'block';

    document.getElementById("login-username").value = '';
    document.getElementById("login-password").value = '';
    document.getElementById("signup-username").value = '';
    document.getElementById("signup-password").value = '';

    loginStatus.verify = false;

    localStorage.setItem('loginStatus', 'false');

    console.log('Login Status: ');
    console.log(localStorage.getItem('loginStatus'));

    localStorage.removeItem('loginStatus');
    localStorage.removeItem('username');
}

// Login state logic
if (loginStatus.verify == true) {
    app.style.display = 'block';
    loginScreen.style.display = 'none';
} else if (loginStatus.verify == false || loginStatus.verify == undefined || loginStatus.verify == null) {
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
        const response = await fetch(localhost + port + '/login' + `?username=${username}&password=${password}`, {method: "POST"});

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