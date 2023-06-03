const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const checkboxSchema = new Schema({
    checked: Boolean,
    content: String
})

const noteSchema = new Schema({
    user: {
        type: mongoose.ObjectId
    },
    title: String,
    body: String,
    checkboxes: [checkboxSchema]
}, { timestamps: true });

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;