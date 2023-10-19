// This route assigns/checks for bcrypt hashing, and assigns a jsonwebtoken on successful login

const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Users } = require('../models');


router.post("/register", async (req, res) => {
    try {
        const { email, username, password, role } = req.body;

        if (!['User', 'Admin', 'Manager'].includes(role)) {
            return res.status(400).json({ success: false, message: "Invalid role"})
        }

        const existingUser = await Users.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email already taken" });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        await Users.create({
            email,
            username,
            password: hashedPassword,
            role
        });

        res.json({ success: true, message: "Account registered." });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    // find by username
    const user = await Users.findOne({ where: { username } });

    // if user exists and password matches
    if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ id: user.id, role: user.role }, 'your_secret_key', { expiresIn: '1h' });
        res.json({ success: true, token });
    } else {
        res.status(401).json({ success: false, message: "Invalid credentials" });
    }
});

module.exports = router;