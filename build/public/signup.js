// DOM elements
const msg = document.getElementById('credential-msg');

// API link
const localpath = 'http://localhost:80/signup';

// Create user function
async function createUser(username, password) {
    try {
        const response = await fetch(localpath + `?username=${username}&password=${password}`, {method: 'POST'});

        if (response.ok) {
            const jsonResponse = await response.json();

            console.log(jsonResponse);

            app.style.display = 'block';
            loginScreen.style.display = 'none';

        } else {
            console.log('Signup not successful. User account exists.');

            const jsonResponse = await response.json();

            console.log(jsonResponse);

            msg.style.display = 'block';
            msg.innerHTML = `<p>Sign Up not successful. User account already exists.</p>`
        
            login = false;
        }
    } catch(err) {
        throw new Error('Could not create a user via POST: ' + err)
    }
}