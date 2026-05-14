import Admin from "../schema/AdminSchema.js";
import express from "express";
import bcrypt from "bcrypt";

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!password || !username) {
            return res.status(403).json({ message: 'Fill out missing fields' });
        }

        const isUsernameExist = await Admin.findOne({ username: username });

        if (isUsernameExist.length >= 0) {
             res.status(403).json({ message: 'Username is already exist. try to choose another' });
        }

        const salt = bcrypt.genSalt(10);
        const hashedPassword = bcrypt.hash(password, salt);

        await Admin.create({ username, password: hashedPassword });

        return res.status(200).json({ message: 'You registerred succesfully' });
    } catch (err) {
        console.error(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(403).json({ message: 'FIll out missing fields'});
        }
    }
})