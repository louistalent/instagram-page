const path = require('path');
const express = require("express");
const app = express();
const http = require('http').createServer(app);
const { Server } = require("socket.io");
const io = new Server(http);

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dbConfig = require('./config/db');
const userRoute = require('./routes/userRoute');
// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());
// DB Config
mongoose.connect(dbConfig.db, { useNewUrlParser: true }).then(() => console.log("MongoDB successfully connected")).catch(err => console.log(err));
// Routes
app.use("/user", userRoute);
app.use(express.static('build'));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build/index.html'));
});

const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
http.listen(port, () => console.log(`Server up and running on port ${port} !`));