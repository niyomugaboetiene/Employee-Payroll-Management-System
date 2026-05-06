import mongoose from "mongoose";

const connect = async () => {
    try {
        const conn = await mongoose.connect('mongodb://localhost:27017/EPMS');
        console.log("Connected successfully");
        return conn
    } catch (err) {
        console.error("ERROR", err);
    }
}

connect();