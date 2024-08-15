// App PUT edit task
app.put('/tasks/:user', (req, res, next) => {
    const user = req.params.user;

    const original = req.query.original;
    const edit = req.query.edit;

    console.log('Original: ' + original);
    console.log('Edit: ' + edit);

    fs.readFile(`./database/${user}.json`, 'utf8', (err, result) => {
        if (err) {
            newError('Could not read file: ', err);
        } else {
            let data = JSON.parse(result);

            const originalIndex = findIndex(original, data.list);
            console.log('originalIndex: ');
            console.log(originalIndex);

            if (originalIndex !== -1) {
                data.list[originalIndex] = edit;

                console.log('Data object after edit');
                console.log(data);

                let returnData = JSON.stringify(data);

                console.log('returnData stringify: ');
                console.log(returnData);

                fs.writeFile(`./database/${user}.json`, returnData, (err) => {
                    if (err) {
                        newError('Write failed in PUT: ', err);
                    } else {
                        console.log('Write successful');
                        console.log(returnData);
                        
                        res.status(200).json({data: data.list[originalIndex]});
                    }
                })
            } else {
                res.status(404).send();
            }
        }
    })
})