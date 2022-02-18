const Note = require("../models/Note");

const notes_all_get = (req, res) => {
    console.log("Request for blogs received.");
    Note.find()
        .then((notes) => {
            res.json(notes);
        })
        .catch((err) => {
            console.log("ERROR in displaying notes");
            res.status(404).send("Could not find notes");
        })
};

const note_ID_get = (req, res) => {
    const id = req.params.id;
    Note.findById(id)
    .then(note => {
        res.json(note);
    })
    .catch(err => {
        console.log("ERROR in displaying notes");
        res.status(404).send("Could not find note");
    })
};

const note_add_post = (req, res) => {
    // console.log(req.body);
    const note = new Note(req.body);

    note.save()
    .then((result) => {
        res.redirect("/");
    })
    .catch((err) => {
        console.log("ERROR in saving note: " + err);
    });
};

const note_modify_post = (req, res) => {
    Note.findByIdAndUpdate(req.body.id, req.body.note)
    .then((result) => {
        res.redirect("/");
    })
    .catch((err) => {
        console.log("ERROR in saving note: " + err);
    });
};

const note_ID_delete = (req, res) => {
    const id = req.params.id;
    Note.findByIdAndDelete(id)
    .then((result) => {
        res.json({success: true});
    })
    .catch((err) => {
        console.log("ERROR in deleting note: " + err);
    });
};

module.exports = {
    notes_all_get,
    note_ID_get,
    note_add_post,
    note_modify_post,
    note_ID_delete
}