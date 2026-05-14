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

        
    }
})