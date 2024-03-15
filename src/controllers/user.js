const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// instructor's code
/*
const signupUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const exists = await User.findOne({ username });
        if (exists) {
            return res.status(400).json({ error: "Username already in use." })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            password: hashedPassword
        });

        res.status(201).json({ newUser });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
*/

const signupUser = async (req, res) => {  // bcrypt is slow, so async
    const { username, password } = req.body;
    try {
        const exists = await User.findOne({ username });
        if(exists) {
            return req.status(400).json({ error: "Username already in use." });
        }

        const hashedPassword = await bcrypt.hash(password, 10) ; // hash 10 times here
        const newUser = await User.create({
            username,
            password: hashedPassword
        });

        res.status(201).json({ newUser });
    } catch (error) {
        res.status(400).json({ error: error.messager });
    }
};

// instructor's code

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const exists = await User.findOne({ username });
        if (!exists) {
            return res.status(404).json({ error: "Username not found." });
        }

        const isPasswordMatched = await bcrypt.compare(password, exists.password);

        if (!isPasswordMatched) {
            return res.status(400).json({ error: "Incorrect password "});
        }

        const token = jwt.sign({ userId: exists._id }, process.env.JWT_SECRET);

        res.status(200).json({ username, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// My code
/*
const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const exists = await User.findOne({ username });
        if(!exist) {
            return res.status(404).json({ error: "Username not found!"});
        }

        const isPasswordMatched = await bcrypt.compare(password, exists.password);
        if(!isPasswordMatched) {  // if password not matching
            return res.status(400).json({ error: "Incorrect password "});
        }

        const token = jwt.sign({ userId: exists._id }, process.env.JWT_SECRET);  // verified userID and password, so JWT can sign now token
        res.status(200).json({ username, token});
    } catch (error) {
        res.status(400).json({ error: error.messag4});
    }
};
*/

// instructor's code
/*
module.exports = {
    signupUser,
    loginUser
}
*/

module.exports = {
    signupUser,
    loginUser
}

