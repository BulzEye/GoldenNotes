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

userSchema.statics.login = async function(email, pass, googleSub=null) {
    const user = await this.findOne({ email });
    console.log(googleSub);
    if(googleSub) {
        console.log("Google JWT found");
        console.log(user);
        if(user) {
            if(user.password == googleSub) {
                return user;
            }
            else {
                // user already registered with Google email
                throw Error("Google Error: User already registered with this Gmail address. Use regular login");
            }
        }
        else {
            throw Error("Google Error: User does not exist. Sign up instead.")
        }
    }
    else {
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
}

const User = mongoose.model("User", userSchema);

module.exports = User;