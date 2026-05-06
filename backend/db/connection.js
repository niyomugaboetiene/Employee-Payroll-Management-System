import mongoose from "mongoose";

const connection = async () => {
    try {
        const connect = await mongoose.connect("mongodb://localhost:27017/EPMS");
        console.log("connected succesfully");
        return connect;
    } catch (err) {
        console.error(err);
    }
}

connection();

export default connection;