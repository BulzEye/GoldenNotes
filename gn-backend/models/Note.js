const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    user: {
        type: mongoose.ObjectId
    },
    title: {
        type: String,
        required: true
    },
    body: String
}, { timestamps: true });

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;