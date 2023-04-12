const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true,
        lowercase: true,
        validate: [isEmail, "Please enter a valid email"]
    },
    username: String,
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minlength: [8, "Minimum password length is 8 characters"]
    }
}, {timestamps: true});

userSchema.pre("save", async function (next) {
    console.log("User about to be created");
    // password hashing code

    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    
    next();
});

userSchema.statics.login = async function(email, pass, googleJwt=null) {
    const user = await this.findOne({ email });
    console.log(googleJwt);
    if(googleJwt) {
        console.log("Google JWT found");
    }
    if(user) {
        const isAuth = await bcrypt.compare(pass, user.password);
        if(isAuth) {
            return user;
        }
        else {
            throw Error("Wrong password entered");
        }
    }
    throw Error("User does not exist");
}

const User = mongoose.model("User", userSchema);

module.exports = User;