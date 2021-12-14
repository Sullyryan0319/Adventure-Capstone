const express = require("express");
const mongoose = require('mongoose');
const config = require("config");
const connectDB = require('./startup/db');
var cors = require("cors");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.listen(5000, function (){
    console.log("Server started. Listening on port 5000.");
});

app.get("/", (req, res) => {
    res.send("hello");
   });
   