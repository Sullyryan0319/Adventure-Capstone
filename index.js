const express = require("express");
const mongoose = require('mongoose');
const config = require("config");
const connectDB = require('./startup/db');
var cors = require("cors");
const adventurers = require('./routes/adventurers');
const activities = require('./routes/activities');
const lodgingOptions = require('./routes/lodgingOptions');
const venues = require('./routes/venues');
const app = express();

connectDB();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/adventurers', adventurers);
app.use('/api/activities', activities);
app.use('/api/lodgingOptions', lodgingOptions);
app.use('/api/venues', venues);


const port = process.env.PORT || 5000;
app.listen(port, () => {
 console.log(`Server started on port: ${port}`);
});

app.get("/", (req, res) => {
    res.send("hello");
   });
   