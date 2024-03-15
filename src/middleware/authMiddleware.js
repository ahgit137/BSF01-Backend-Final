// instructor's code
/*
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) return res.status(403).json({ error: "Access Denied" });

    try {
        const decoded = jwt.verify(
            token.substring(7),
            process.env.JWT_SECRET
        );
        req.user = { userID: decoded.id };

        next();
    } catch (error) {
        res.status(403).json({ error: "Access Denied" })
    }
}
*/

const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
    const token = req.header("Authorization");    // token is created in controllers/user.js
    if(!token) {
        return res.status(403).json({ error: "Access Denied"});   // 403 = forbidden
    }
    try {
        const decoded = jwt.verify (
            token.substring(7),
            process.env.JWT_SECRET
        );

        req.user = { userID: decoded.id };
        next();   // can now proceed to do next process
    } catch (error) {
        res.status(403).json({ error: "Access Denied" });   // or just do error: error.message
    }
}

module.exports = {
    authMiddleware
}