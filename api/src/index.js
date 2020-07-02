const express = require('express');
const mongoose = require('mongoose');
const { connectDb } = require('./helpers/db');
const { host, port, db } = require('./configuration/index');
const app = express();
const postSchema = new mongoose.Schema({
    name: String
});

const Post = mongoose.model('Post', postSchema);

const startServer = () => {
    app.listen(port, () => {
        console.log(`Started API service on port: ${port}`);
        console.log(`Our host: ${host}`);
        console.log(`Our DataBase: ${db}`);


        Post.find(function (err, posts) {
            if (err) return console.error(err);
            console.log("posts new", posts);
        })


        /*
        const silence = new Post({ name: 'Silence' });
        silence.save(function (err, savedSilence) {
            if (err) return console.error(err);
            console.log('savedSilence', savedSilence);
        });
        */
    });
}

app.get("/test", (req, res) => {
    res.send('Our API server is working correctly.');
});

connectDb()
    .on("error", console.log)
    .on("disconnected", connectDb)
    .once("open", startServer);