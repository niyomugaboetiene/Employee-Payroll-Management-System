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

        const isUsernameExist = await Admin.findOne({ username });

        if (isUsernameExist) {
             res.status(403).json({ message: 'Username is already exist. try to choose another' });
             return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

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

        const isUsernameExist = await Admin.findOne({ username });

        if (!isUsernameExist) {
            return res.status(404).json({ message: 'Enter valid username' });
        }

        const hashedPassword = isUsernameExist.password;

        const isPasswordExist = await bcrypt.compare(password, hashedPassword);

        if (!isPasswordExist) {
            return res.status(401).json({ message: 'Incorrect password' });
        }
        
        req.session.admin = {
           id: isUsernameExist._id,
           username: isUsernameExist.username
        }
    
         return  res.status(200).json({ message: 'Logged in succesfully', session: req.session.admin });
    } catch (err) {
        console.error(err);
    }
});

export default router;