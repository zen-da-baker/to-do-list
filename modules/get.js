// App GET login credentials
app.get('/login', (req, res, next) => {
    const username = req.query.username;
    const password = req.query.password;

    const validation = checkCredentials(username, password);

    console.log('Validation helper returned to GET request');
    console.log(validation);

    if (validation == true) {
        console.log("Login found and validated on server side");
        res.status(200).json({validation: true});
    } else {
        console.log("Login not found on server side");
        res.status(404).send();
    }

})

// App GET all tasks
app.get('/tasks/:user', (req, res, next) => {
    const user = req.params.user;

    console.log('User at GET: ' + user);

    fs.readFile(`./database/${user}.json`, 'utf8', (err, result) => {

        if (err) {
            res.status(404).send();
            newError('Could not read file', err);
        } else {
            const data = JSON.parse(result);
            res.status(200).json({data: data.list});
        }

    })
})