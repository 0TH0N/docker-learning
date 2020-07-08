const express = require('express');
const axios = require('axios');
const { host, port, authApiUrl } = require('./configuration/index');
const app = express();

const startServer = () => {
    app.listen(port, () => {
        console.log(`Started Mail service on port: ${port}`);
        console.log(`Our host: ${host}`);
    });
}

app.get("/mailtest", (req, res) => {
    res.send('Our Mail server is working correctly.');
});

app.get("/testwithcurrentuser", (req, res) => {
    axios.get(authApiUrl + '/currentUser').then(response => {
        res.json({
            testwithcurrentuser: true,
            currentUserFromAuth: response.data
        });
    });
});

startServer();

