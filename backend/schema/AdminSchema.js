import mongoose from "mongoose";
import connection from "../db/connection.js";

connection();

const AdminSchema = mongoose.Schema({
       username: { type: String, required: true, unique: true },
       password: { type: String, required: true }
}, { timestamps: true});

const Admin = mongoose.model("admins", AdminSchema);
export default Admin;