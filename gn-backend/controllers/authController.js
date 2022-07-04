const User = require("../models/User");

module.exports.login_post = (req, res) => {
    console.log("Received POST request for logging in");
    console.log(req.body);
    res.send("Received request");
};

module.exports.signup_post = (req, res) => {
    console.log("Received POST request for signing up");
    res.send("Received request");
};