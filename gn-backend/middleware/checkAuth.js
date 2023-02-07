const User = require("../models/User");
const jwt = require("jsonwebtoken");

const checkAuth = async (req, res, next) => {
    
    const { authorization } = req.headers;
    // console.log(req.headers);
    
    if(!authorization) {
        return res.status(401).json({error: "Authorization token not received"});
    }
    
    const token = authorization.split(" ")[1];
    // console.log(token);

    try {
        const { id } = jwt.verify(token, "BulzEye secret");
    
        req.user = await User.findById(id).select("_id");
        next();
    }
    catch(err) {
        if(err.message === "jwt expired") {
            console.log("JWT has expired");
            return res.status(401).json({error: "JWT has expired. Please log in again"});
        }
        console.log("JWT verification error: " + err.message);
        // user jwt not verified
        return res.status(401).json({error: "Request is not authorized"});
    }
}

module.exports = checkAuth;