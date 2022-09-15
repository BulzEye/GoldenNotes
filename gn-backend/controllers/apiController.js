const jwt = require("jsonwebtoken");

const Note = require("../models/Note");
const User = require("../models/User");

// const checkUser = (token) => {
//     console.log(token);
//     if(token === undefined) {
//         console.log("reached");
//         try {
//             const decodedToken = jwt.verify(token, "BulzEye secret");
//             if(decodedToken) {
//                 // console.log("jwt verified");
//                 const id = decodedToken.id;
//                 return id;
//             }
//             else {
//                 console.log("Could not verify jwt");
//                 return undefined;
//             }
//         }
//         catch(err) {
//             console.log("JWT verification error: " + err.message);
//             // user jwt not verified
//             return undefined;
//         }
//     }
//     else {
//         // no user found
//         return undefined;
//     }
// }

const notes_all_get = (req, res) => {
    console.log("Request for notes received.");
    // console.log(req.cookies.jwt);
    let userId = req.user._id;
    // console.log(userId);
    User.findById(userId)
    .then((user) => {
        Note.find({ user })
        .then((notes) => {
            res.json({ user, notes });
        })
        .catch((err) => {
            console.log("ERROR in displaying notes");
            res.status(400).send("Could not find notes");
        });
    })
    .catch((err) => {
        console.log("Weird, this error shouldn't be possible, somehow it landed");
        console.log(err);
        res.status(400).send("Error");
    });
};

const note_ID_get = (req, res) => {
    let userId = req.user._id;
    // console.log(userId);
    const id = req.params.id;
    // check if note can be found even when passing user in query along with id
    Note.findById(id)
    .then(note => {
        res.json(note);
    })
    .catch(err => {
        console.log("ERROR in displaying notes");
        res.status(404).send("Could not find note");
    });
};

const note_add_post = (req, res) => {
    // console.log(req.body);

    let userId = req.user._id;
    req.body.user = userId;
    const note = new Note(req.body);
    
    note.save()
    .then((result) => {
        console.log("Added new note");
        res.redirect("/");
    })
    .catch((err) => {
        console.log("ERROR in saving note: " + err);
    });
    
    
};

const note_modify_post = (req, res) => {
    let userId = req.user._id;
    // console.log(userId);
    // console.log(req.body);
    req.body.user = userId;
    Note.findByIdAndUpdate(req.body.id, req.body.note)
    .then((result) => {
        console.log("Modified note");
        res.redirect("/");
    })
    .catch((err) => {
        console.log("ERROR in saving note: " + err);
    });
};

const note_ID_delete = (req, res) => {
    let userId = req.user._id;
    // console.log(userId);
    const id = req.params.id;
    Note.findByIdAndDelete(id)
    .then((result) => {
        console.log("Deleted note");
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