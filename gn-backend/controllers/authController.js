const User = require("../models/User");
const jwt = require("jsonwebtoken");

const errorHandler = (err) => {
    console.log(err);
    let errors = {email: "", password: ""};
    if(err.code === 11000) {
        errors.email = "This email is already registered. Log in instead.";
        return errors
    }
    if(err.message.includes("User validation failed")) {
        console.log("Received error");
        Object.values(err.errors).forEach(({properties})=> {
            errors[properties.path] = properties.message;
        });
    }
    if(err.message === "User does not exist") {
        errors.email = err.message;
    }
    if(err.message === "Wrong password entered") {
        errors.password = err.message;
    }
    return errors;
}

const maxAge = 30*24*60*60; // 1 month
// const maxAge = 60;
const createToken = (id) => {
    return jwt.sign({id}, "BulzEye secret", {
        expiresIn: maxAge
    });
}

module.exports.login_post = (req, res) => {
    console.log("Received POST request for logging in");
    // console.log(req.body);

    User.login(req.body.email, req.body.password)
    .then((user) => {
        const token = createToken(user._id);
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge*1000 });
        user._id = undefined;
        user.password = undefined;
        res.status(201).send({ jwt: token, user });
    })
    .catch((err) => {
        // console.log(err);
        const errors = errorHandler(err);
        res.status(400).send({errors});
    })
    // res.send("Received request");
};

module.exports.signup_post = async (req, res) => {
    console.log("Received POST request for signing up");

    const { email, password } = req.body;
    User.create({email, username: email.substring(0, email.indexOf("@")) , password})
    .then((user) => {
        // res.status(201).send(user);
        const token = createToken(user._id);
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge*1000 });
        user._id = undefined;
        user.password = undefined;
        res.status(201).send({ jwt: token, user });
    })
    .catch((err) => {
        const errors = errorHandler(err);
        res.status(400).send({errors});
    });

    // res.send("Received request");
};

module.exports.user_get = async (req, res) => {
    console.log(req.params.token);
    const userId = checkUser(req.params.token);
    if(userId) {
        console.log("Got user");
        User.findById(userId)
        .then((user) => {
            res.json({user});
        })
        .catch((err) => {
            res.status(400).json({redirect: "/login"});
        });
    }
    else {
        // user not found, redirect user
        console.log("User not found");
        res.json({redirect: "/login"});
    }
}