const express = require('express');
const { connectDb } = require('./helpers/db');
const { host, port, db } = require('./configuration/index');
const app = express();


const startServer = () => {
    app.listen(port, () => {
        console.log(`Started auth service on port: ${port}`);
        console.log(`Our host: ${host}`);
        console.log(`Our DataBase: ${db}`);
    });
}

app.get("/api/currentUser", (req, res) => {
    res.json({
        id: "1234",
        email: "foo@gmail.com"
    });
});

app.get("/test", (req, res) => {
    res.send('Our auth server is working correctly.');
});

connectDb()
    .on("error", console.log)
    .on("disconnected", connectDb)
    .once("open", startServer);