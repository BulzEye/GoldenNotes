const jwt = require("jsonwebtoken");

const Note = require("../models/Note");
const User = require("../models/User");

const checkUser = (token) => {
    if(token) {
        try {
            const decodedToken = jwt.verify(token, "BulzEye secret");
            if(decodedToken) {
                // console.log("jwt verified");
                const id = decodedToken.id;
                return id;
            }
            else {
                console.log("Could not verify jwt");
                return undefined;
            }
        }
        catch(err) {
            console.log(err.message);
            // user jwt not verified
            return undefined;
        }
    }
    else {
        // no user found
        return undefined;
    }
}

const notes_all_get = (req, res) => {
    console.log("Request for notes received.");
    // console.log(req.cookies.jwt);
    let userId = checkUser(req.cookies.jwt);
    // console.log(userId);
    if(userId) {
        // console.log("User verified");
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
    }
    else {
        // user not found, redirect user
        res.json({redirect: "/login"});
    }
};

const note_ID_get = (req, res) => {
    let userId = checkUser(req.cookies.jwt);
    // console.log(userId);
    if(userId) {
        const id = req.params.id;
        // check if note can be found even when passing user in query along with id
        Note.findById(id)
        .then(note => {
            res.json(note);
        })
        .catch(err => {
            console.log("ERROR in displaying notes");
            res.status(404).send("Could not find note");
        })
    }
    else {
        // user not found, redirect user
        res.json({redirect: "/login"});
    }
};

const note_add_post = (req, res) => {
    console.log(req.body);

    let userId = checkUser(req.cookies.jwt);
    // console.log(userId);
    if(userId && userId === req.body.user) {
        const note = new Note(req.body);

        note.save()
        .then((result) => {
            res.redirect("/");
        })
        .catch((err) => {
            console.log("ERROR in saving note: " + err);
        });
    }
    else {
        // user not found, redirect user
        res.json({redirect: "/login"});
    }

    
};

const note_modify_post = (req, res) => {
    let userId = checkUser(req.cookies.jwt);
    // console.log(userId);
    if(userId && userId === req.body.user) {
        // console.log(req.body.note);
        Note.findByIdAndUpdate(req.body.id, req.body.note)
        .then((result) => {
            res.redirect("/");
        })
        .catch((err) => {
            console.log("ERROR in saving note: " + err);
        });
    }
    else {
        // user not found, redirect user
        res.json({redirect: "/login"});
    }
};

const note_ID_delete = (req, res) => {
    let userId = checkUser(req.cookies.jwt);
    // console.log(userId);
    if(userId) {
        console.log("User verified");
        const id = req.params.id;
        Note.findByIdAndDelete(id)
        .then((result) => {
            res.json({success: true});
        })
        .catch((err) => {
            console.log("ERROR in deleting note: " + err);
        });
    }
    else {
        // user not found, redirect user
        res.json({redirect: "/login"});
    }
};

module.exports = {
    notes_all_get,
    note_ID_get,
    note_add_post,
    note_modify_post,
    note_ID_delete
}