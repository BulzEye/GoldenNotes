const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    user: {
        type: mongoose.ObjectId
    },
    title: String,
    body: String,
    checkboxes: [String],
    checked: [String]
}, { timestamps: true });

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;