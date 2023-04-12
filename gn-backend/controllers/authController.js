const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");

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

module.exports.login_post = async (req, res) => {
    console.log("Received POST request for logging in");
    console.log(req.body);

    let sub = undefined;

    if(req.body.googleJwt) {
        // add special code for dealing with Google auth and JWT

        // Google auth works as follows:
        // - Most of the login work is handled by Google's servers (no work for us yay)
        // - It sends a JWT to us (response.credential)
        // - We make a new OAuth2 client and verify this JWT to make sure it is valid
        // - After validating, get user details from the payload
        // - Continue with making a new user as usual, with email and username taken from the payload
        // - Store the user's unique user ID (the 'sub' field) in the password field. It will be handled separately in the login method.
        const client = new OAuth2Client(process.env.CLIENT_ID);
        const ticket = await client.verifyIdToken({
            idToken: req.body.googleJwt,
            audience: process.env.CLIENT_ID
        });
        const payload = ticket.getPayload();
        console.log(payload);
        email = payload.email;
        username = payload.name;
        password = payload.sub;
    }

    User.login(req.body.email, req.body.password, req.body.googleJwt)
    // .then((user) => {
    //     const token = createToken(user._id);
    //     res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge*1000 });
    //     user._id = undefined;
    //     user.password = undefined;
    //     res.status(201).send({ jwt: token, user });
    // })
    .catch((err) => {
        // console.log(err);
        const errors = errorHandler(err);
        res.status(400).send({errors});
    })
    res.send("Received request");
};

module.exports.signup_post = async (req, res) => {
    console.log("Received POST request for signing up");

    let { email, password, googleJwt } = req.body;

    // console.log(googleJwt);

    let username = "";

    if(googleJwt) {
        // Google auth works as follows:
        // - Most of the signup work is handled by Google's servers (no work for us yay)
        // - It sends a JWT to us (response.credential)
        // - We make a new OAuth2 client and verify this JWT to make sure it is valid
        // - After validating, get user details from the payload
        // - Continue with making a new user as usual, with email and username taken from the payload
        // - Store the user's unique user ID (the 'sub' field) in the password field. It will be handled separately in the login method.
        const client = new OAuth2Client(process.env.CLIENT_ID);
        const ticket = await client.verifyIdToken({
            idToken: googleJwt,
            audience: process.env.CLIENT_ID
        });
        const payload = ticket.getPayload();
        console.log(payload);
        email = payload.email;
        username = payload.name;
        password = payload.sub;
        
        // Send error response (FOR TESTING)
        // res.status(401).send({errors: {google: "Google ERROR", email: "TESTING GOOGLE SIGN UP", password: "HEMLO"}})
    }
    else {
        username = email.substring(0, email.indexOf("@"));
    }

    User.create({email, username, password})
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