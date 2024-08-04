// API link
const localpath = 'http://localhost:5500/signup';

// Create user function
async function createUser(username, password) {
    try {
        const response = await fetch(localpath + `?username=${username}&password=${password}`, {method: 'post'});

        if (response.ok) {
            const jsonResponse = await response.json();

            console.log(jsonResponse);

            app.style.display = 'block';
            loginScreen.style.display = 'none';

        } else {
            console.log('Login not valid');
            login = false;
        }
    } catch(err) {
        throw new Error('Could not create a user via POST: ' + err)
    }
}