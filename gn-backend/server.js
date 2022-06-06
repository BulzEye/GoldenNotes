const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const apiRoutes = require("./routes/apiRoutes");

require("dotenv").config();

const app = express();

app.use(express.json());

var corsOptions = {
    origin: 'https://goldennotes.netlify.app',
    optionsSuccessStatus: 200 // For legacy browser support
}

app.use(cors(corsOptions));

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true})
    .then((dbObj) => {
        console.log("Successfully connected to MongoDB database");
    })
    .catch((err) => {
        console.log("ERROR in connecting to database: " + err);
    });

let notes = require("./testData/testNotes.js");
console.log(`Notes: ${notes}`);

app.listen(process.env.PORT || 3001, () => {
    console.log(`App listening on port ${process.env.PORT || 3001}`);
});

app.get("/", (req, res) => {
    res.send("<p>Hello</p>");
});

app.use(apiRoutes);
