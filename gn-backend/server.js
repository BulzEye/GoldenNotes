const express = require("express");
const mongoose = require("mongoose");

const Note = require("./Note.js")

require("dotenv").config();

const app = express();

app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true})
    .then((dbObj) => {
        console.log("Successfully connected to MongoDB database");
    })
    .catch((err) => {
        console.log("ERROR in connecting to database: " + err);
    });

let notes = [
    {
        title: "First Note",
        body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque earum eveniet harum quas, recusandae illum dolorum natus fugit ipsa illo, quasi tenetur, amet soluta voluptatum?'
    },
    {
        title: "Second Note",
        body: "boo test succeded"
    }
];

app.listen(3001, () => {
    console.log("App listening on port 3001");
});

app.get("/", (req, res) => {
    res.send("<p>Hello</p>");
});

app.get("/getNotes/", (req, res) => {
    console.log("Request for blogs received.");
    Note.find()
        .then((notes) => {
            res.json(notes);
        })
        .catch((err) => {
            console.log("ERROR in displaying notes");
            res.status(404).send("Could not find notes");
        })
});

app.get("/note/:id", (req, res) => {
    const id = req.params.id;
    Note.findById(id)
    .then(note => {
        res.json(note);
    })
    .catch(err => {
        console.log("ERROR in displaying notes");
        res.status(404).send("Could not find note");
    })
});

app.post("/addnote", (req, res) => {
    // console.log(req.body);
    const note = new Note(req.body);

    note.save()
    .then((result) => {
        res.redirect("/");
    })
    .catch((err) => {
        console.log("ERROR in saving note: " + err);
    });
    
});

app.post("/modifynote", (req, res) => {
    Note.findByIdAndUpdate(req.body.id, req.body.note)
    .then((result) => {
        res.redirect("/");
    })
    .catch((err) => {
        console.log("ERROR in saving note: " + err);
    });
});