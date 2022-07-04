const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    username: String,
    password: {
        type: String,
        required: true
    }
}, {timestamps: true});

userSchema.pre("save", (next) => {
    console.log("User about to be created");
    // password hashing code
    
    next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;