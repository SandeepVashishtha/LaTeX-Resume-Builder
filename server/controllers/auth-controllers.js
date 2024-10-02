const User = require("../models/user-models.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/env-config.js");

const registerUser = async (req, res) => {
    console.log(req.body);

    const { email, username, password } = req.body;
    try {
        const newUser = new User({ email, username, password });
        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({
            message: "User not found. Please register.",
        });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
        expiresIn: "2h",
    });

    res.json({ token });
};

module.exports = {
    registerUser,
    loginUser,
};
