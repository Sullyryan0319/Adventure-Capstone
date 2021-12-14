const express = require("express");
const mongoose = require('mongoose');

mongoose
.connect('mongodb+srv://<username>:<password>@<clustername>.6si6q.mongodb.net/<dbname>?retryWrites=true&w=majority',
{ useNewUrlParser: true, useUnifiedTopology: true })
 .then(() => console.log('Connected to MongoDB...'))
 .catch((err) => console.log(`Could not connect to MongoDB. ERROR: ${err}`));


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.listen(3000, function (){
    console.log("Server started. Listening on port 3000.");
});

app.get("/", (req, res) => {
    res.send("hello");
   });
   